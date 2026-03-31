import { 
  Customer, 
  Transaction, 
  Consultation, 
  ConsultationTemplate,
  CreateConsultationInput,
  CustomerFilters 
} from '../types/cs-console';

// Mock data generators
const names = [
  '김민준', '이서윤', '박지호', '최수빈', '정예준', '강지우', '조서연', '윤도현',
  '장하은', '임채원', '한지민', '오태양', '신유나', '권민지', '배성훈', '송하윤'
];

const tiers: Customer['tier'][] = ['vip', 'gold', 'silver', 'bronze'];
const statuses: Customer['status'][] = ['active', 'dormant', 'restricted'];

function generateCustomers(count: number): Customer[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `CUST-${String(i + 1).padStart(4, '0')}`,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase()}@example.com`,
    phone: `010-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
    customerId: `C${String(i + 1).padStart(8, '0')}`,
    accountNumber: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900000) + 100000}-${Math.floor(Math.random() * 90000) + 10000}`,
    tier: tiers[Math.floor(Math.random() * tiers.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    registeredAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastContactAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalAssets: Math.floor(Math.random() * 500000000),
    creditScore: Math.floor(Math.random() * 400) + 600,
    address: '서울특별시 강남구 테헤란로 123',
    birthDate: '1990-01-01',
  }));
}

const mockCustomers = generateCustomers(50);

function generateTransactions(customerId: string): Transaction[] {
  const types: Transaction['type'][] = ['deposit', 'withdrawal', 'transfer', 'payment'];
  const statuses: Transaction['status'][] = ['completed', 'pending', 'failed'];
  
  return Array.from({ length: 20 }, (_, i) => {
    const amount = Math.floor(Math.random() * 5000000) + 10000;
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: `TXN-${customerId}-${String(i + 1).padStart(4, '0')}`,
      customerId,
      type,
      amount,
      balance: Math.floor(Math.random() * 10000000),
      description: type === 'deposit' ? '입금' : type === 'withdrawal' ? '출금' : type === 'transfer' ? '이체' : '결제',
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      counterparty: type === 'transfer' ? '홍길동' : undefined,
    };
  });
}

function generateConsultations(customerId: string): Consultation[] {
  const categories: Consultation['category'][] = ['account', 'loan', 'card', 'investment', 'technical', 'complaint'];
  const priorities: Consultation['priority'][] = ['low', 'medium', 'high', 'urgent'];
  const statuses: Consultation['status'][] = ['open', 'in-progress', 'resolved', 'closed'];
  
  const subjects = [
    '계좌 비밀번호 초기화 요청',
    '대출 금리 인하 문의',
    '카드 분실 신고',
    '투자 상품 상담',
    '앱 로그인 오류',
    '서비스 불만 접수',
    '통장 재발급 신청',
    '한도 증액 요청'
  ];

  return Array.from({ length: 15 }, (_, i) => ({
    id: `CONS-${customerId}-${String(i + 1).padStart(4, '0')}`,
    customerId,
    agentId: `AGENT-${Math.floor(Math.random() * 10) + 1}`,
    agentName: `상담원${Math.floor(Math.random() * 10) + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    subject: subjects[i % subjects.length],
    content: `고객님의 ${subjects[i % subjects.length]} 건에 대해 상담을 진행하였습니다. 관련 절차를 안내드렸으며, 추가 문의사항이 있으시면 언제든지 연락 부탁드립니다.`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    createdAt: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['일반', '상담완료'],
  }));
}

const templates: ConsultationTemplate[] = [
  {
    id: 'TPL-001',
    category: 'account',
    title: '계좌 비밀번호 초기화',
    content: '고객님의 계좌 비밀번호 초기화 요청을 접수하였습니다.\n\n본인 확인을 위해 다음 정보를 확인해 주시기 바랍니다:\n1. 생년월일\n2. 최근 거래 내역\n3. 등록된 휴대폰 번호\n\n확인 후 임시 비밀번호를 SMS로 발송해 드리겠습니다.\n감사합니다.',
    usageCount: 245,
  },
  {
    id: 'TPL-002',
    category: 'card',
    title: '카드 분실 신고',
    content: '카드 분실 신고를 접수하였습니다.\n\n즉시 카드 사용이 정지되었으며, 부정 사용 방지를 위해 모니터링을 강화하였습니다.\n\n재발급 절차:\n1. 신분증 사본 제출\n2. 재발급 수수료 5,000원\n3. 영업일 기준 3-5일 소요\n\n빠른 시일 내에 새 카드를 받아보실 수 있습니다.',
    usageCount: 189,
  },
  {
    id: 'TPL-003',
    category: 'loan',
    title: '대출 상담',
    content: '대출 상담 요청을 접수하였습니다.\n\n고객님의 신용등급과 소득 정보를 바탕으로 최적의 대출 상품을 안내해 드리겠습니다.\n\n필요 서류:\n1. 재직증명서\n2. 소득 증빙 서류\n3. 신분증 사본\n\n서류 제출 후 2-3 영업일 내 심사 결과를 안내드립니다.',
    usageCount: 312,
  },
  {
    id: 'TPL-004',
    category: 'investment',
    title: '투자 상품 안내',
    content: '투자 상품 문의에 감사드립니다.\n\n고객님의 투자 성향과 목표 수익률에 맞는 상품을 추천해 드리겠습니다.\n\n주요 상품:\n1. 예금/적금 (안정형)\n2. 펀드 (수익추구형)\n3. ETF (적극투자형)\n\n투자 위험도와 예상 수익률을 상세히 안내해 드리겠습니다.',
    usageCount: 276,
  },
  {
    id: 'TPL-005',
    category: 'technical',
    title: '앱 오류 해결',
    content: '앱 이용 중 불편을 드려 죄송합니다.\n\n다음 방법을 시도해 주시기 바랍니다:\n1. 앱 최신 버전으로 업데이트\n2. 캐시 데이터 삭제\n3. 앱 재설치\n\n문제가 지속될 경우 고객센터(1588-0000)로 연락 주시면 즉시 도와드리겠습니다.',
    usageCount: 198,
  },
  {
    id: 'TPL-006',
    category: 'complaint',
    title: '불만 접수',
    content: '불편을 드려 대단히 죄송합니다.\n\n고객님의 소중한 의견을 경청하였으며, 즉시 개선 조치를 취하도록 하겠습니다.\n\n접수 내용:\n- 접수일: {날짜}\n- 담당자: {상담원명}\n- 처리 기한: 3영업일 이내\n\n처리 결과는 SMS 및 이메일로 안내드리겠습니다.\n다시 한번 사과의 말씀을 드립니다.',
    usageCount: 156,
  },
];

// API Functions
export async function fetchCustomers(filters?: CustomerFilters): Promise<Customer[]> {
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
  
  let filtered = [...mockCustomers];
  
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(search) ||
      c.email.toLowerCase().includes(search) ||
      c.phone.includes(search) ||
      c.customerId.toLowerCase().includes(search)
    );
  }
  
  if (filters?.tier) {
    filtered = filtered.filter(c => c.tier === filters.tier);
  }
  
  if (filters?.status) {
    filtered = filtered.filter(c => c.status === filters.status);
  }
  
  return filtered;
}

export async function fetchCustomerById(id: string): Promise<Customer> {
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
  
  const customer = mockCustomers.find(c => c.id === id);
  if (!customer) throw new Error('Customer not found');
  
  return customer;
}

export async function fetchCustomerTransactions(customerId: string): Promise<Transaction[]> {
  await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 800));
  
  return generateTransactions(customerId);
}

export async function fetchCustomerConsultations(customerId: string): Promise<Consultation[]> {
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 700));
  
  return generateConsultations(customerId);
}

export async function fetchTemplates(category?: Consultation['category']): Promise<ConsultationTemplate[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (category) {
    return templates.filter(t => t.category === category);
  }
  
  return templates;
}

export async function createConsultation(input: CreateConsultationInput): Promise<Consultation> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newConsultation: Consultation = {
    id: `CONS-${input.customerId}-${Date.now()}`,
    customerId: input.customerId,
    agentId: 'AGENT-CURRENT',
    agentName: '현재 상담원',
    category: input.category,
    subject: input.subject,
    content: input.content,
    status: 'open',
    priority: input.priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: input.tags,
  };
  
  return newConsultation;
}
