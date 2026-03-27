import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/guards/jwt-auth.guard';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Controller('api/v1/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  /** 경기 등록 (홈팀 캡틴) */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createMatch(@CurrentUser() user: JwtPayload, @Body() dto: CreateMatchDto) {
    return this.matchesService.createMatch(user.sub, dto);
  }

  /** OPEN 경기 목록 */
  @Get()
  async findOpenMatches() {
    return this.matchesService.findOpenMatches();
  }

  /** 내 팀 경기 목록 */
  @Get('me')
  async findMyTeamMatches(@CurrentUser() user: JwtPayload) {
    return this.matchesService.findMyTeamMatches(user.sub);
  }

  /** 경기 단건 조회 */
  @Get(':matchId')
  async findMatch(@Param('matchId') matchId: string) {
    return this.matchesService.findMatchById(matchId);
  }

  /** 경기 신청 (상대팀 캡틴) */
  @Patch(':matchId/apply')
  async applyMatch(@Param('matchId') matchId: string, @CurrentUser() user: JwtPayload) {
    return this.matchesService.applyMatch(matchId, user.sub);
  }

  /** 경기 취소 (홈팀 캡틴) */
  @Patch(':matchId/cancel')
  async cancelMatch(@Param('matchId') matchId: string, @CurrentUser() user: JwtPayload) {
    return this.matchesService.cancelMatch(matchId, user.sub);
  }
}
