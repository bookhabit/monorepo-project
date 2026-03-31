import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryCustomersDto } from './customer.dto';
import { CustomerService } from './customer.service';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: '고객 목록 조회 (검색/등급/상태 필터)' })
  findAll(@Query() dto: QueryCustomersDto) {
    return this.customerService.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '고객 상세 조회' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Get(':id/transactions')
  @ApiOperation({ summary: '고객 거래 내역 조회 (최근 20건)' })
  getTransactions(@Param('id') id: string) {
    return this.customerService.getTransactions(id);
  }
}
