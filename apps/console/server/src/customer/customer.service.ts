import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer, CustomerFilters, CustomerTransaction } from './customer.types';

const NAMES = ['김민준', '이서윤', '박지호', '최수빈', '정예준', '강지우', '조서연', '윤도현',
               '장하은', '임채원', '한지민', '오태양', '신유나', '권민지', '배성훈', '송하윤'];
const TIERS: Customer['tier'][] = ['vip', 'gold', 'silver', 'bronze'];
const STATUSES: Customer['status'][] = ['active', 'dormant', 'restricted'];

function generateCustomers(count: number): Customer[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `CUST-${String(i + 1).padStart(4, '0')}`,
    name: NAMES[i % NAMES.length],
    email: `user${i + 1}@example.com`,
    phone: `010-${String(Math.floor(Math.random() * 9000) + 1000)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    customerId: `C${String(i + 1).padStart(8, '0')}`,
    accountNumber: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900000) + 100000}-${Math.floor(Math.random() * 90000) + 10000}`,
    tier: TIERS[i % TIERS.length],
    status: STATUSES[i % STATUSES.length],
    registeredAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastContactAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalAssets: Math.floor(Math.random() * 500_000_000),
    address: '서울특별시 강남구 테헤란로 123',
    birthDate: '1990-01-01',
    creditScore: Math.floor(Math.random() * 400) + 600,
  }));
}

function generateTransactions(customerId: string): CustomerTransaction[] {
  const types: CustomerTransaction['type'][] = ['deposit', 'withdrawal', 'transfer', 'payment'];
  const statuses: CustomerTransaction['status'][] = ['completed', 'pending', 'failed'];
  const descriptions = { deposit: '입금', withdrawal: '출금', transfer: '이체', payment: '결제' };

  return Array.from({ length: 20 }, (_, i) => {
    const type = types[i % types.length];
    return {
      id: `TXN-${customerId}-${String(i + 1).padStart(4, '0')}`,
      customerId,
      type,
      amount: Math.floor(Math.random() * 5_000_000) + 10_000,
      balance: Math.floor(Math.random() * 10_000_000),
      description: descriptions[type],
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      status: statuses[i % statuses.length],
      counterparty: type === 'transfer' ? '홍길동' : undefined,
    };
  });
}

@Injectable()
export class CustomerService {
  private readonly customers = generateCustomers(50);

  findAll(filters?: CustomerFilters): Customer[] {
    let result = this.customers;

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.customerId.toLowerCase().includes(q),
      );
    }
    if (filters?.tier) result = result.filter((c) => c.tier === filters.tier);
    if (filters?.status) result = result.filter((c) => c.status === filters.status);

    return result;
  }

  findOne(id: string): Customer {
    const customer = this.customers.find((c) => c.id === id);
    if (!customer) throw new NotFoundException(`고객 ${id}을(를) 찾을 수 없습니다.`);
    return customer;
  }

  getTransactions(customerId: string): CustomerTransaction[] {
    this.findOne(customerId); // 존재 여부 확인
    return generateTransactions(customerId);
  }
}
