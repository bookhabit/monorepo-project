import { Transaction, FilterParams, UserRiskProfile, RiskTimeline } from '../types/fds';

// Generate mock initial data
const generateMockTransactions = (count: number): Transaction[] => {
  const types: Array<'transfer' | 'withdrawal' | 'deposit' | 'payment'> = ['transfer', 'withdrawal', 'deposit', 'payment'];
  const riskLevels: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high', 'critical'];
  const statuses: Array<'normal' | 'suspicious' | 'blocked' | 'reviewing'> = ['normal', 'suspicious', 'blocked', 'reviewing'];
  const names = ['김철수', '이영희', '박민수', '최지영', '정현우', '강서연', '조민재', '윤수정'];
  const locations = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종'];

  return Array.from({ length: count }, (_, i) => {
    const riskScore = Math.floor(Math.random() * 100);
    const riskLevel = riskScore >= 80 ? 'critical' : riskScore >= 60 ? 'high' : riskScore >= 40 ? 'medium' : 'low';
    
    return {
      id: `TXN-${String(i + 1).padStart(6, '0')}`,
      userId: `USER-${Math.floor(Math.random() * 1000)}`,
      userName: names[Math.floor(Math.random() * names.length)],
      type: types[Math.floor(Math.random() * types.length)],
      amount: Math.floor(Math.random() * 10000000) + 100000,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      riskLevel,
      riskScore,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      deviceId: `DEV-${Math.floor(Math.random() * 10000)}`,
      flags: riskScore > 70 ? ['대량 출금', '새로운 수취인'] : riskScore > 50 ? ['비정상 시간대'] : [],
    };
  });
};

const mockTransactions = generateMockTransactions(5000);

export async function fetchTransactions(filters: FilterParams = {}): Promise<Transaction[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...mockTransactions];

  if (filters.status) {
    filtered = filtered.filter((t) => t.status === filters.status);
  }

  if (filters.riskLevel) {
    filtered = filtered.filter((t) => t.riskLevel === filters.riskLevel);
  }

  if (filters.type) {
    filtered = filtered.filter((t) => t.type === filters.type);
  }

  if (filters.minAmount) {
    filtered = filtered.filter((t) => t.amount >= filters.minAmount!);
  }

  if (filters.maxAmount) {
    filtered = filtered.filter((t) => t.amount <= filters.maxAmount!);
  }

  if (filters.minRiskScore) {
    filtered = filtered.filter((t) => t.riskScore >= filters.minRiskScore!);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.userName.toLowerCase().includes(searchLower) ||
        t.id.toLowerCase().includes(searchLower) ||
        t.userId.toLowerCase().includes(searchLower)
    );
  }

  return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function batchBlock(transactionIds: string[]): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (Math.random() < 0.05) {
    throw new Error('일괄 차단 처리에 실패했습니다.');
  }

  transactionIds.forEach((id) => {
    const transaction = mockTransactions.find((t) => t.id === id);
    if (transaction) {
      transaction.status = 'blocked';
    }
  });
}

export async function batchUnblock(transactionIds: string[]): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (Math.random() < 0.05) {
    throw new Error('일괄 차단 해제에 실패했습니다.');
  }

  transactionIds.forEach((id) => {
    const transaction = mockTransactions.find((t) => t.id === id);
    if (transaction) {
      transaction.status = 'normal';
    }
  });
}

export async function fetchUserRiskProfile(userId: string): Promise<UserRiskProfile> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const userTransactions = mockTransactions.filter((t) => t.userId === userId);
  
  // Generate timeline for last 24 hours
  const timeline: RiskTimeline[] = Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
    riskScore: Math.floor(Math.random() * 100),
    event: i % 4 === 0 ? '대량 출금' : i % 3 === 0 ? '새로운 수취인' : '정상 거래',
  }));

  return {
    userId,
    userName: userTransactions[0]?.userName || '사용자',
    totalTransactions: userTransactions.length,
    suspiciousTransactions: userTransactions.filter((t) => t.status === 'suspicious').length,
    blockedTransactions: userTransactions.filter((t) => t.status === 'blocked').length,
    avgRiskScore: Math.floor(
      userTransactions.reduce((sum, t) => sum + t.riskScore, 0) / userTransactions.length
    ),
    timeline,
    recentTransactions: userTransactions.slice(0, 10),
  };
}
