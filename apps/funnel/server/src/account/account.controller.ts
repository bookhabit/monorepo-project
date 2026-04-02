import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplyAccountDto } from './apply-account.dto';
import { AccountService } from './account.service';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('apply')
  @ApiOperation({ summary: '계좌 개설 신청' })
  @ApiResponse({ status: 201, description: '계좌 개설 신청 성공', schema: { example: { accountNumber: '110-123456789', createdAt: '2024-01-01T00:00:00.000Z' } } })
  @ApiResponse({ status: 400, description: '잘못된 요청 (필수 약관 미동의 또는 신청 실패)' })
  apply(@Body() dto: ApplyAccountDto) {
    return this.accountService.apply(dto);
  }
}
