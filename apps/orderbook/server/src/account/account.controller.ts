import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOperation({ summary: '계좌 잔고 조회' })
  @ApiResponse({ status: 200, description: '계좌 잔고 조회 성공', schema: { example: { cash: 10000000, stockQuantity: 0 } } })
  getBalance() {
    return this.accountService.getBalance();
  }
}
