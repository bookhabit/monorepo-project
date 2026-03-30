import {
  Controller, Post, Delete,
  Body, Req, Res, HttpCode, HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard';
import { ErrorCode } from '../../common/constants/error-codes';
import { SessionsService } from './sessions.service';
import { LoginDto } from './dto/login.dto';

const RT_COOKIE = 'guide_app_rt';

const RT_COOKIE_OPTIONS = {
  httpOnly: true,          // JS 접근 불가 — XSS 방어
  sameSite: 'strict' as const, // 외부 도메인 요청에서 쿠키 전송 차단 — CSRF 방어
  secure: process.env['NODE_ENV'] === 'production', // HTTPS에서만 전송 (프로덕션)
  path: '/',               // 모든 경로에서 접근 가능하게 (refresh + logout 모두 필요)
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7일 (ms)
};

@Controller('api/v1/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  /**
   * 로그인
   * AT → response body (클라이언트 메모리에 저장)
   * RT → httpOnly Cookie (JS 접근 불가)
   */
  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.sessionsService.login(dto);

    res.cookie(RT_COOKIE, refreshToken, RT_COOKIE_OPTIONS);

    return { accessToken };
  }

  /**
   * 토큰 갱신 (Silent Refresh)
   * RT는 httpOnly 쿠키에서 자동 수신 → body로 전달받지 않음
   * 새 AT → response body, 새 RT → Cookie (Rotation)
   */
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies[RT_COOKIE] as string | undefined;

    if (!refreshToken) {
      throw new UnauthorizedException({
        code: ErrorCode.MISSING_REFRESH_TOKEN,
        message: '리프레시 토큰이 없습니다.',
      });
    }

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await this.sessionsService.refresh(refreshToken);

      res.cookie(RT_COOKIE, newRefreshToken, RT_COOKIE_OPTIONS);

      return { accessToken };
    } catch (error) {
      // 토큰이 있었지만 유효하지 않음 → 브라우저 쿠키도 즉시 삭제
      res.clearCookie(RT_COOKIE, { ...RT_COOKIE_OPTIONS, maxAge: 0 });
      throw error;
    }
  }

  /**
   * 로그아웃
   * DB 세션 삭제 + RT 쿠키 제거
   */
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.sessionsService.logout(user.sub);
    res.clearCookie(RT_COOKIE, { ...RT_COOKIE_OPTIONS, maxAge: 0 });
  }
}
