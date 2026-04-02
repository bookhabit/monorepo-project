import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryCustomersDto } from './customer.dto';
import { Customer, CustomerTransaction } from './customer.types';
import { CustomerService } from './customer.service';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: '고객 목록 조회 (검색/등급/상태 필터)' })
  @ApiResponse({ status: 200, description: '고객 목록 반환', type: [Customer] })
  findAll(@Query() dto: QueryCustomersDto) {
    return this.customerService.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '고객 상세 조회' })
  @ApiResponse({ status: 200, description: '고객 상세 정보 반환', type: Customer })
  @ApiResponse({ status: 404, description: '고객을 찾을 수 없음' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Get(':id/transactions')
  @ApiOperation({ summary: '고객 거래 내역 조회 (최근 20건)' })
  @ApiResponse({ status: 200, description: '고객 거래 내역 반환', type: [CustomerTransaction] })
  @ApiResponse({ status: 404, description: '고객을 찾을 수 없음' })
  getTransactions(@Param('id') id: string) {
    return this.customerService.getTransactions(id);
  }
}
