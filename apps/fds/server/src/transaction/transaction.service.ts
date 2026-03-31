import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { BatchActionDto } from '../dto/batch-action.dto';
import { QueryTransactionsDto } from '../dto/query-transactions.dto';
import {
  RiskLevel,
  Transaction,
  TransactionPage,
  TransactionStatus,
  TransactionType,
  UserRiskProfile,
  UserRole,
} from './transaction.types';

const NAMES = ['김철수', '이영희', '박민수', '최지영', '정현우', '강서연', '조민재', '윤수정'];
const LOCATIONS = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종'];
const TYPES: TransactionType[] = ['transfer', 'withdrawal', 'deposit', 'payment'];
const RISK_LEVELS: RiskLevel[] = ['low', 'low', 'low', 'medium', 'medium', 'high', 'critical'];

function randomIp(): string {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 255)).join('.');
}

function buildFlags(riskScore: number): string[] {
  const flags: string[] = [];
  if (riskScore > 80) flags.push('대량 출금', '해외 IP');
  else if (riskScore > 60) flags.push('새로운 수취인');
  if (riskScore > 50) flags.push('비정상 시간대');
  return flags;
}

function generateTransaction(index: number, tsOffset = 0): Transaction {
  const riskScore = Math.floor(Math.random() * 100);
  const riskLevel: RiskLevel =
    riskScore >= 80 ? 'critical' : riskScore >= 60 ? 'high' : riskScore >= 40 ? 'medium' : 'low';
  const statuses: TransactionStatus[] = ['normal', 'suspicious', 'reviewing'];

  return {
    id: `TXN-${String(index + 1).padStart(6, '0')}`,
    userId: `USER-${Math.floor(Math.random() * 1000)}`,
    userName: NAMES[index % NAMES.length],
    type: TYPES[index % TYPES.length],
    amount: Math.floor(Math.random() * 10_000_000) + 100_000,
    timestamp: new Date(Date.now() - tsOffset).toISOString(),
    riskLevel,
    riskScore,
    status: riskScore > 70 ? 'suspicious' : statuses[Math.floor(Math.random() * statuses.length)],
    ipAddress: randomIp(),
    location: LOCATIONS[index % LOCATIONS.length],
    deviceId: `DEV-${Math.floor(Math.random() * 10_000)}`,
    flags: buildFlags(riskScore),
  };
}

@Injectable()
export class TransactionService {
  private readonly transactions: Transaction[] = Array.from({ length: 5_000 }, (_, i) =>
    generateTransaction(i, Math.random() * 24 * 60 * 60 * 1000),
  );

  private readonly stream$ = new Subject<Transaction>();
  private streamIndex = 5_000;

  constructor() {
    this.startStream();
  }

  // ── REST ──────────────────────────────────────────────

  findPage(dto: QueryTransactionsDto): TransactionPage {
    const page = Number(dto.page ?? 1);
    const pageSize = Number(dto.pageSize ?? 20);

    const filtered = this.transactions.filter((t) => {
      if (dto.status && t.status !== dto.status) return false;
      if (dto.riskLevel && t.riskLevel !== dto.riskLevel) return false;
      if (dto.type && t.type !== dto.type) return false;
      if (dto.minAmount && t.amount < Number(dto.minAmount)) return false;
      if (dto.maxAmount && t.amount > Number(dto.maxAmount)) return false;
      if (dto.minRiskScore && t.riskScore < Number(dto.minRiskScore)) return false;
      if (dto.startDate && t.timestamp < dto.startDate) return false;
      if (dto.endDate && t.timestamp > dto.endDate) return false;
      if (dto.search) {
        const q = dto.search.toLowerCase();
        return (
          t.userName.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.userId.toLowerCase().includes(q)
        );
      }
      return true;
    });

    const sorted = filtered.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    return {
      data: sorted.slice((page - 1) * pageSize, page * pageSize),
      total: sorted.length,
      page,
      pageSize,
      totalPages: Math.ceil(sorted.length / pageSize),
    };
  }

  findOne(id: string): Transaction {
    const t = this.transactions.find((t) => t.id === id);
    if (!t) throw new NotFoundException(`거래 ${id}을(를) 찾을 수 없습니다.`);
    return t;
  }

  getUserRiskProfile(userId: string): UserRiskProfile {
    const userTxns = this.transactions.filter((t) => t.userId === userId);
    const userName = userTxns[0]?.userName ?? '사용자';

    const timeline = Array.from({ length: 24 }, (_, i) => {
      const riskScore = Math.floor(Math.random() * 100);
      return {
        timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
        riskScore,
        event:
          riskScore > 80 ? '이상 거래 탐지' :
          riskScore > 60 ? '주의 거래' :
          riskScore > 40 ? '새로운 수취인' : '정상 거래',
      };
    });

    return {
      userId,
      userName,
      totalTransactions: userTxns.length,
      suspiciousTransactions: userTxns.filter((t) => t.status === 'suspicious').length,
      blockedTransactions: userTxns.filter((t) => t.status === 'blocked').length,
      avgRiskScore: userTxns.length
        ? Math.floor(userTxns.reduce((s, t) => s + t.riskScore, 0) / userTxns.length)
        : 0,
      timeline,
      recentTransactions: userTxns.slice(0, 10),
    };
  }

  // ── Batch ────────────────────────────────────────────

  batchBlock(dto: BatchActionDto, role: UserRole): void {
    if (role === 'monitor') throw new ForbiddenException('모니터링 요원은 차단 처리를 할 수 없습니다.');
    if (Math.random() < 0.05) throw new Error('일괄 차단 처리에 실패했습니다.');
    dto.ids.forEach((id) => {
      const t = this.transactions.find((t) => t.id === id);
      if (t) t.status = 'blocked';
    });
  }

  batchUnblock(dto: BatchActionDto, role: UserRole): void {
    if (role === 'monitor') throw new ForbiddenException('모니터링 요원은 차단 해제를 할 수 없습니다.');
    if (Math.random() < 0.05) throw new Error('일괄 차단 해제에 실패했습니다.');
    dto.ids.forEach((id) => {
      const t = this.transactions.find((t) => t.id === id);
      if (t) t.status = 'normal';
    });
  }

  // ── SSE ──────────────────────────────────────────────

  getStream(): Observable<Transaction> {
    return this.stream$.asObservable();
  }

  // ── Private ──────────────────────────────────────────

  private startStream(): void {
    const schedule = () => {
      const delay = Math.random() * 2_000 + 1_000; // 1~3초
      setTimeout(() => {
        const txn = generateTransaction(this.streamIndex++, 0);
        this.transactions.unshift(txn);
        this.stream$.next(txn);
        schedule();
      }, delay);
    };
    schedule();
  }
}
