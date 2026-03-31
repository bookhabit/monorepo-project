import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BatchActionDto } from '../dto/batch-action.dto';
import { QueryLoansDto } from '../dto/query-loans.dto';
import { ReviewLoanDto } from '../dto/review-loan.dto';
import {
  LoanApplication,
  LoanPage,
  LoanReviewHistory,
  LoanStatus,
  UserRole,
} from './loan.types';

const NAMES = ['김철수', '이영희', '박민수', '최지영', '정현우', '강서연', '조민재', '윤수정'];
const PURPOSES = ['주택구입', '전세자금', '생활자금', '사업자금', '자동차구입', '교육자금'];
const STATUSES: LoanStatus[] = ['pending', 'reviewing', 'approved', 'rejected'];

function generateData(count: number): LoanApplication[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `LOAN-${String(i + 1).padStart(6, '0')}`,
    applicantName: NAMES[i % NAMES.length],
    applicantId: String(100000 + i),
    amount: Math.floor(Math.random() * 50_000_000) + 5_000_000,
    purpose: PURPOSES[i % PURPOSES.length],
    creditScore: Math.floor(Math.random() * 500) + 500,
    monthlyIncome: Math.floor(Math.random() * 5_000_000) + 2_000_000,
    employmentYears: Math.floor(Math.random() * 20),
    status: STATUSES[i % STATUSES.length],
    appliedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    riskLevel: (['low', 'medium', 'high'] as const)[i % 3],
    documents: ['신분증', '재직증명서', '소득증빙'],
  }));
}

@Injectable()
export class LoanService {
  private readonly loans = generateData(10_000);
  private readonly histories = new Map<string, LoanReviewHistory[]>();

  // ── Query ─────────────────────────────────────────────

  findPage(dto: QueryLoansDto): LoanPage {
    const page = Number(dto.page ?? 1);
    const pageSize = Number(dto.pageSize ?? 20);

    let filtered = this.loans.filter((loan) => {
      if (dto.status && loan.status !== dto.status) return false;
      if (dto.riskLevel && loan.riskLevel !== dto.riskLevel) return false;
      if (dto.minAmount && loan.amount < Number(dto.minAmount)) return false;
      if (dto.maxAmount && loan.amount > Number(dto.maxAmount)) return false;
      if (dto.minCreditScore && loan.creditScore < Number(dto.minCreditScore)) return false;
      if (dto.search) {
        const q = dto.search.toLowerCase();
        return loan.applicantName.toLowerCase().includes(q) || loan.id.toLowerCase().includes(q);
      }
      return true;
    });

    const total = filtered.length;
    const data = filtered.slice((page - 1) * pageSize, page * pageSize);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  findOne(id: string): LoanApplication {
    const loan = this.loans.find((l) => l.id === id);
    if (!loan) throw new NotFoundException(`대출 신청 ${id}을(를) 찾을 수 없습니다.`);
    return loan;
  }

  getHistory(id: string): LoanReviewHistory[] {
    const loan = this.findOne(id);
    const stored = this.histories.get(id);
    if (stored) return stored;

    const history: LoanReviewHistory[] = [
      {
        id: `${id}-1`,
        applicationId: id,
        action: 'submitted',
        performedBy: loan.applicantName,
        performedAt: loan.appliedAt,
        newStatus: 'pending',
      },
      {
        id: `${id}-2`,
        applicationId: id,
        action: 'review_started',
        performedBy: '심사역',
        performedAt: new Date(new Date(loan.appliedAt).getTime() + 3_600_000).toISOString(),
        previousStatus: 'pending',
        newStatus: 'reviewing',
      },
    ];

    if (loan.reviewedAt) {
      history.push({
        id: `${id}-3`,
        applicationId: id,
        action: loan.status === 'approved' ? 'approved' : 'rejected',
        performedBy: loan.reviewedBy ?? '심사역',
        performedAt: loan.reviewedAt,
        previousStatus: 'reviewing',
        newStatus: loan.status,
        note: loan.status === 'approved' ? '신용도 및 소득 검증 완료' : '신용점수 기준 미달',
      });
    }

    return history;
  }

  // ── Single actions ────────────────────────────────────

  review(id: string, dto: ReviewLoanDto, role: UserRole): LoanApplication {
    const loan = this.findOne(id);

    if (dto.status === 'rejected' && role === 'reviewer') {
      throw new ForbiddenException('일반 심사역은 거절 처리를 할 수 없습니다.');
    }

    this.applyStatus(loan, dto.status, role, dto.notes);
    return loan;
  }

  cancelRejection(id: string, role: UserRole): LoanApplication {
    if (role === 'reviewer') {
      throw new ForbiddenException('팀장급 이상만 거절 취소가 가능합니다.');
    }

    const loan = this.findOne(id);
    if (loan.status !== 'rejected') {
      throw new ForbiddenException('거절 상태인 신청건만 취소할 수 있습니다.');
    }

    const prev = loan.status;
    loan.status = 'reviewing';
    loan.reviewedAt = undefined;
    loan.reviewedBy = undefined;
    this.addHistory(id, 'rejection_cancelled', role, prev, 'reviewing');
    return loan;
  }

  // ── Batch actions ─────────────────────────────────────

  batchApprove(dto: BatchActionDto, role: UserRole): void {
    if (Math.random() < 0.05) throw new Error('일괄 승인 처리에 실패했습니다.');
    dto.ids.forEach((id) => {
      const loan = this.loans.find((l) => l.id === id);
      if (loan) this.applyStatus(loan, 'approved', role);
    });
  }

  batchReject(dto: BatchActionDto, role: UserRole): void {
    if (role === 'reviewer') {
      throw new ForbiddenException('일반 심사역은 일괄 거절을 할 수 없습니다.');
    }
    if (Math.random() < 0.05) throw new Error('일괄 거절 처리에 실패했습니다.');
    dto.ids.forEach((id) => {
      const loan = this.loans.find((l) => l.id === id);
      if (loan) this.applyStatus(loan, 'rejected', role);
    });
  }

  // ── Private ───────────────────────────────────────────

  private applyStatus(
    loan: LoanApplication,
    status: 'approved' | 'rejected',
    role: UserRole,
    note?: string,
  ): void {
    const prev = loan.status;
    loan.status = status;
    loan.reviewedAt = new Date().toISOString();
    loan.reviewedBy = role;
    this.addHistory(loan.id, status, role, prev as any, status, note);
  }

  private addHistory(
    id: string,
    action: LoanReviewHistory['action'],
    performedBy: string,
    previousStatus?: LoanStatus,
    newStatus?: LoanStatus,
    note?: string,
  ): void {
    const list = this.histories.get(id) ?? this.getHistory(id);
    list.push({
      id: `${id}-${list.length + 1}`,
      applicationId: id,
      action,
      performedBy,
      performedAt: new Date().toISOString(),
      previousStatus,
      newStatus,
      note,
    });
    this.histories.set(id, list);
  }
}
