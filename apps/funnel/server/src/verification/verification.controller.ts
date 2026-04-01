import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendVerificationDto, VerifyCodeDto } from './verification.dto';
import { VerificationService } from './verification.service';

@ApiTags('verification')
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('send')
  @HttpCode(200)
  @ApiOperation({ summary: '인증번호 발송 (데모: 항상 123456)' })
  @ApiResponse({ status: 200, description: '인증번호 발송 성공', schema: { example: { message: '인증번호가 발송되었습니다.' } } })
  @ApiResponse({ status: 400, description: '잘못된 요청 (전화번호 형식 오류)' })
  send(@Body() dto: SendVerificationDto) {
    this.verificationService.send(dto.phoneNumber);
    return { message: '인증번호가 발송되었습니다.' };
  }

  @Post('verify')
  @HttpCode(200)
  @ApiOperation({ summary: '인증번호 확인 (6자리 숫자면 통과)' })
  @ApiResponse({ status: 200, description: '인증번호 확인 결과', schema: { example: { verified: true } } })
  @ApiResponse({ status: 400, description: '잘못된 요청 (전화번호 형식 오류 또는 코드 불일치)' })
  verify(@Body() dto: VerifyCodeDto) {
    const verified = this.verificationService.verify(dto.phoneNumber, dto.code);
    return { verified };
  }
}
