import { Body, Controller, Get, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BatchActionDto } from '../dto/batch-action.dto';
import { QueryLoansDto } from '../dto/query-loans.dto';
import { ReviewLoanDto } from '../dto/review-loan.dto';
import { LoanService } from './loan.service';
import { LoanApplication, LoanPage, LoanReviewHistory, UserRole } from './loan.types';

const ROLE_HEADER = 'x-user-role';
const DEFAULT_ROLE: UserRole = 'reviewer';

function parseRole(raw: string | undefined): UserRole {
  if (raw === 'manager' || raw === 'admin') return raw;
  return DEFAULT_ROLE;
}

@ApiTags('loans')
@ApiHeader({ name: ROLE_HEADER, description: 'reviewer | manager | admin', required: false })
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  @ApiOperation({ summary: '대출 신청 목록 조회 (서버사이드 필터 + 페이지네이션)' })
  @ApiResponse({ status: 200, description: '대출 신청 목록 페이지', type: LoanPage })
  findPage(@Query() dto: QueryLoansDto) {
    return this.loanService.findPage(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '대출 신청 단건 조회' })
  @ApiResponse({ status: 200, description: '대출 신청 단건', type: LoanApplication })
  @ApiResponse({ status: 404, description: '대출 신청을 찾을 수 없음' })
  findOne(@Param('id') id: string) {
    return this.loanService.findOne(id);
  }

  @Get(':id/history')
  @ApiOperation({ summary: '심사 이력 조회' })
  @ApiResponse({ status: 200, description: '심사 이력 목록', type: [LoanReviewHistory] })
  @ApiResponse({ status: 404, description: '대출 신청을 찾을 수 없음' })
  getHistory(@Param('id') id: string) {
    return this.loanService.getHistory(id);
  }

  @Patch(':id/review')
  @ApiOperation({ summary: '단건 승인/거절 (거절은 manager 이상)' })
  @ApiResponse({ status: 200, description: '심사 처리된 대출 신청', type: LoanApplication })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '대출 신청을 찾을 수 없음' })
  review(
    @Param('id') id: string,
    @Body() dto: ReviewLoanDto,
    @Headers(ROLE_HEADER) role: string | undefined,
  ) {
    return this.loanService.review(id, dto, parseRole(role));
  }

  @Patch(':id/cancel-rejection')
  @ApiOperation({ summary: '거절 취소 (manager 이상 전용)' })
  @ApiResponse({ status: 200, description: '거절 취소된 대출 신청', type: LoanApplication })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '대출 신청을 찾을 수 없음' })
  cancelRejection(
    @Param('id') id: string,
    @Headers(ROLE_HEADER) role: string | undefined,
  ) {
    return this.loanService.cancelRejection(id, parseRole(role));
  }

  @Post('batch-approve')
  @ApiOperation({ summary: '일괄 승인 (모든 역할 가능)' })
  @ApiResponse({ status: 201, description: '일괄 승인 완료 메시지', schema: { properties: { message: { type: 'string' } } } })
  batchApprove(
    @Body() dto: BatchActionDto,
    @Headers(ROLE_HEADER) role: string | undefined,
  ) {
    this.loanService.batchApprove(dto, parseRole(role));
    return { message: `${dto.ids.length}건이 승인 처리되었습니다.` };
  }

  @Post('batch-reject')
  @ApiOperation({ summary: '일괄 거절 (manager 이상 전용)' })
  @ApiResponse({ status: 201, description: '일괄 거절 완료 메시지', schema: { properties: { message: { type: 'string' } } } })
  @ApiResponse({ status: 403, description: '권한 없음' })
  batchReject(
    @Body() dto: BatchActionDto,
    @Headers(ROLE_HEADER) role: string | undefined,
  ) {
    this.loanService.batchReject(dto, parseRole(role));
    return { message: `${dto.ids.length}건이 거절 처리되었습니다.` };
  }
}
