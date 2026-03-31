import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Consultation,
  ConsultationCategory,
  ConsultationTemplate,
  CreateConsultationDto,
} from './consultation.types';

const SUBJECTS = [
  '계좌 비밀번호 초기화 요청', '대출 금리 인하 문의', '카드 분실 신고',
  '투자 상품 상담', '앱 로그인 오류', '서비스 불만 접수',
  '통장 재발급 신청', '한도 증액 요청',
];

const TEMPLATES: ConsultationTemplate[] = [
  {
    id: 'TPL-001', category: 'account', title: '계좌 비밀번호 초기화', usageCount: 245,
    content: '고객님의 계좌 비밀번호 초기화 요청을 접수하였습니다.\n\n본인 확인을 위해 다음 정보를 확인해 주시기 바랍니다:\n1. 생년월일\n2. 최근 거래 내역\n3. 등록된 휴대폰 번호\n\n확인 후 임시 비밀번호를 SMS로 발송해 드리겠습니다.',
  },
  {
    id: 'TPL-002', category: 'card', title: '카드 분실 신고', usageCount: 189,
    content: '카드 분실 신고를 접수하였습니다.\n\n즉시 카드 사용이 정지되었으며, 부정 사용 방지를 위해 모니터링을 강화하였습니다.\n\n재발급 절차:\n1. 신분증 사본 제출\n2. 재발급 수수료 5,000원\n3. 영업일 기준 3-5일 소요',
  },
  {
    id: 'TPL-003', category: 'loan', title: '대출 상담', usageCount: 312,
    content: '대출 상담 요청을 접수하였습니다.\n\n고객님의 신용등급과 소득 정보를 바탕으로 최적의 대출 상품을 안내해 드리겠습니다.\n\n필요 서류:\n1. 재직증명서\n2. 소득 증빙 서류\n3. 신분증 사본',
  },
  {
    id: 'TPL-004', category: 'investment', title: '투자 상품 안내', usageCount: 276,
    content: '투자 상품 문의에 감사드립니다.\n\n고객님의 투자 성향과 목표 수익률에 맞는 상품을 추천해 드리겠습니다.\n\n주요 상품:\n1. 예금/적금 (안정형)\n2. 펀드 (수익추구형)\n3. ETF (적극투자형)',
  },
  {
    id: 'TPL-005', category: 'technical', title: '앱 오류 해결', usageCount: 198,
    content: '앱 이용 중 불편을 드려 죄송합니다.\n\n다음 방법을 시도해 주시기 바랍니다:\n1. 앱 최신 버전으로 업데이트\n2. 캐시 데이터 삭제\n3. 앱 재설치',
  },
  {
    id: 'TPL-006', category: 'complaint', title: '불만 접수', usageCount: 156,
    content: '불편을 드려 대단히 죄송합니다.\n\n고객님의 소중한 의견을 경청하였으며, 즉시 개선 조치를 취하도록 하겠습니다.\n\n처리 기한: 3영업일 이내\n처리 결과는 SMS 및 이메일로 안내드리겠습니다.',
  },
];

function generateConsultations(customerId: string): Consultation[] {
  const categories: ConsultationCategory[] = ['account', 'loan', 'card', 'investment', 'technical', 'complaint'];
  const priorities: Consultation['priority'][] = ['low', 'medium', 'high', 'urgent'];
  const statuses: Consultation['status'][] = ['open', 'in-progress', 'resolved', 'closed'];

  return Array.from({ length: 15 }, (_, i) => ({
    id: `CONS-${customerId}-${String(i + 1).padStart(4, '0')}`,
    customerId,
    agentId: `AGENT-${(i % 10) + 1}`,
    agentName: `상담원${(i % 10) + 1}`,
    category: categories[i % categories.length],
    subject: SUBJECTS[i % SUBJECTS.length],
    content: `고객님의 ${SUBJECTS[i % SUBJECTS.length]} 건에 대해 상담을 진행하였습니다.`,
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    createdAt: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['일반'],
  }));
}

@Injectable()
export class ConsultationService {
  private readonly created: Consultation[] = [];

  getByCustomer(customerId: string): Consultation[] {
    const generated = generateConsultations(customerId);
    const extra = this.created.filter((c) => c.customerId === customerId);
    return [...extra, ...generated];
  }

  getTemplates(category?: ConsultationCategory): ConsultationTemplate[] {
    return category ? TEMPLATES.filter((t) => t.category === category) : TEMPLATES;
  }

  create(dto: CreateConsultationDto): Consultation {
    const consultation: Consultation = {
      id: `CONS-${dto.customerId}-${Date.now()}`,
      customerId: dto.customerId,
      agentId: 'AGENT-CURRENT',
      agentName: '현재 상담원',
      category: dto.category,
      subject: dto.subject,
      content: dto.content,
      status: 'open',
      priority: dto.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: dto.tags ?? [],
    };
    this.created.unshift(consultation);
    return consultation;
  }
}
