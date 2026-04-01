import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty({ description: '고객 고유 ID' })
  id!: string;

  @ApiProperty({ description: '고객 이름' })
  name!: string;

  @ApiProperty({ description: '이메일 주소' })
  email!: string;

  @ApiProperty({ description: '전화번호' })
  phone!: string;

  @ApiProperty({ description: '고객 번호' })
  customerId!: string;

  @ApiProperty({ description: '계좌 번호' })
  accountNumber!: string;

  @ApiProperty({ enum: ['vip', 'gold', 'silver', 'bronze'], description: '고객 등급' })
  tier!: 'vip' | 'gold' | 'silver' | 'bronze';

  @ApiProperty({ enum: ['active', 'dormant', 'restricted'], description: '고객 상태' })
  status!: 'active' | 'dormant' | 'restricted';

  @ApiProperty({ description: '가입일 (ISO 8601)' })
  registeredAt!: string;

  @ApiProperty({ description: '마지막 연락일 (ISO 8601)' })
  lastContactAt!: string;

  @ApiProperty({ description: '총 자산 (원)' })
  totalAssets!: number;

  @ApiProperty({ description: '주소' })
  address!: string;

  @ApiProperty({ description: '생년월일 (ISO 8601)' })
  birthDate!: string;

  @ApiProperty({ description: '신용 점수' })
  creditScore!: number;
}

export class CustomerTransaction {
  @ApiProperty({ description: '거래 고유 ID' })
  id!: string;

  @ApiProperty({ description: '고객 ID' })
  customerId!: string;

  @ApiProperty({ enum: ['deposit', 'withdrawal', 'transfer', 'payment'], description: '거래 유형' })
  type!: 'deposit' | 'withdrawal' | 'transfer' | 'payment';

  @ApiProperty({ description: '거래 금액 (원)' })
  amount!: number;

  @ApiProperty({ description: '잔액 (원)' })
  balance!: number;

  @ApiProperty({ description: '거래 설명' })
  description!: string;

  @ApiProperty({ description: '거래 일시 (ISO 8601)' })
  timestamp!: string;

  @ApiProperty({ enum: ['completed', 'pending', 'failed'], description: '거래 상태' })
  status!: 'completed' | 'pending' | 'failed';

  @ApiProperty({ required: false, description: '상대방 계좌/이름' })
  counterparty?: string;
}

export class CustomerFilters {
  @ApiProperty({ required: false, description: '검색어' })
  search?: string;

  @ApiProperty({ required: false, enum: ['vip', 'gold', 'silver', 'bronze'], description: '고객 등급' })
  tier?: Customer['tier'];

  @ApiProperty({ required: false, enum: ['active', 'dormant', 'restricted'], description: '고객 상태' })
  status?: Customer['status'];
}
