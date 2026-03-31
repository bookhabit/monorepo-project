import {
  Body,
  Controller,
  Get,
  Headers,
  MessageEvent,
  Param,
  Post,
  Query,
  Res,
  Sse,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { BatchActionDto } from '../dto/batch-action.dto';
import { QueryTransactionsDto } from '../dto/query-transactions.dto';
import { TransactionService } from './transaction.service';
import { UserRole } from './transaction.types';

const ROLE_HEADER = 'x-user-role';

function parseRole(raw: string | undefined): UserRole {
  if (raw === 'security_manager' || raw === 'admin') return raw;
  return 'monitor';
}

@ApiTags('transactions')
@ApiHeader({ name: ROLE_HEADER, description: 'monitor | security_manager | admin', required: false })
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Sse('stream')
  @ApiOperation({ summary: '실시간 거래 SSE 스트림 (1~3초 주기)' })
  stream(@Res() res: Response): Observable<MessageEvent> {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');
    return this.transactionService
      .getStream()
      .pipe(map((txn) => ({ data: txn }) as MessageEvent));
  }

  @Get()
  @ApiOperation({ summary: '거래 목록 조회 (서버사이드 필터 + 페이지네이션)' })
  findPage(@Query() dto: QueryTransactionsDto) {
    return this.transactionService.findPage(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '거래 단건 조회' })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Post('batch-block')
  @ApiOperation({ summary: '일괄 차단 (security_manager 이상)' })
  batchBlock(
    @Body() dto: BatchActionDto,
    @Headers(ROLE_HEADER) role: string | undefined,
  ) {
    this.transactionService.batchBlock(dto, parseRole(role));
    return { message: `${dto.ids.length}건이 차단 처리되었습니다.` };
  }

  @Post('batch-unblock')
  @ApiOperation({ summary: '일괄 차단 해제 (security_manager 이상)' })
  batchUnblock(
    @Body() dto: BatchActionDto,
    @Headers(ROLE_HEADER) role: string | undefined,
  ) {
    this.transactionService.batchUnblock(dto, parseRole(role));
    return { message: `${dto.ids.length}건이 차단 해제되었습니다.` };
  }
}

// ── Users ────────────────────────────────────────────────────────────────────

import { Controller as C, Get as G, Param as P } from '@nestjs/common';
import { ApiTags as AT, ApiOperation as AO } from '@nestjs/swagger';

@AT('users')
@C('users')
export class UserController {
  constructor(private readonly transactionService: TransactionService) {}

  @G(':userId/risk-profile')
  @AO({ summary: '유저 위험도 프로파일 (24h 타임라인 포함)' })
  getRiskProfile(@P('userId') userId: string) {
    return this.transactionService.getUserRiskProfile(userId);
  }
}
