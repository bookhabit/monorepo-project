import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendVerificationDto, VerifyCodeDto } from './verification.dto';
import { VerificationService } from './verification.service';

@ApiTags('verification')
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('send')
  @HttpCode(200)
  @ApiOperation({ summary: '인증번호 발송 (데모: 항상 123456)' })
  send(@Body() dto: SendVerificationDto) {
    this.verificationService.send(dto.phoneNumber);
    return { message: '인증번호가 발송되었습니다.' };
  }

  @Post('verify')
  @HttpCode(200)
  @ApiOperation({ summary: '인증번호 확인 (6자리 숫자면 통과)' })
  verify(@Body() dto: VerifyCodeDto) {
    const verified = this.verificationService.verify(dto.phoneNumber, dto.code);
    return { verified };
  }
}
