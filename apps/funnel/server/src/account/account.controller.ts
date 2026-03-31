import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplyAccountDto } from './apply-account.dto';
import { AccountService } from './account.service';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('apply')
  @ApiOperation({ summary: '계좌 개설 신청' })
  apply(@Body() dto: ApplyAccountDto) {
    return this.accountService.apply(dto);
  }
}
