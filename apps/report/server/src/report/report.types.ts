import { ApiProperty } from '@nestjs/swagger';

export type TimeRange = 'daily' | 'weekly' | 'monthly';

export class ProductType {
  @ApiProperty({ description: '상품 고유 ID' })
  id!: string;

  @ApiProperty({ description: '상품명' })
  name!: string;

  @ApiProperty({ enum: ['savings', 'loan', 'card', 'investment'], description: '상품 카테고리' })
  category!: 'savings' | 'loan' | 'card' | 'investment';
}

export class KPIMetric {
  @ApiProperty({ description: 'KPI 고유 ID' })
  id!: string;

  @ApiProperty({ description: 'KPI 제목' })
  title!: string;

  @ApiProperty({ description: '현재 값' })
  value!: number;

  @ApiProperty({ description: '변화량' })
  change!: number;

  @ApiProperty({ enum: ['increase', 'decrease'], description: '변화 방향' })
  changeType!: 'increase' | 'decrease';

  @ApiProperty({ description: '단위' })
  unit!: string;

  @ApiProperty({ type: [Number], description: '추세 데이터 (최근 6개 시점)' })
  trend!: number[];
}

export class SubscriberTrend {
  @ApiProperty({ description: '날짜 (YYYY-MM-DD)' })
  date!: string;

  @ApiProperty({ description: '총 가입자 수' })
  subscribers!: number;

  @ApiProperty({ description: '신규 가입자 수' })
  newSubscribers!: number;

  @ApiProperty({ description: '이탈률 (%)' })
  churnRate!: number;

  @ApiProperty({ required: false, description: '상품 ID (상품별 필터 시)' })
  productId?: string;
}

export class SystemMetrics {
  @ApiProperty({ description: '측정 일시 (ISO 8601)' })
  timestamp!: string;

  @ApiProperty({ description: '초당 트랜잭션 수 (TPS)' })
  tps!: number;

  @ApiProperty({ description: '오류율 (%)' })
  errorRate!: number;

  @ApiProperty({ description: '평균 응답 시간 (ms)' })
  avgResponseTime!: number;

  @ApiProperty({ description: '동시 접속 사용자 수' })
  activeUsers!: number;

  @ApiProperty({ description: 'CPU 사용률 (%)' })
  cpuUsage!: number;

  @ApiProperty({ description: '메모리 사용률 (%)' })
  memoryUsage!: number;
}

export class ReportData {
  @ApiProperty({ type: () => [KPIMetric], description: 'KPI 지표 목록' })
  kpis!: KPIMetric[];

  @ApiProperty({ type: () => [SubscriberTrend], description: '가입자 추이 데이터' })
  subscriberTrends!: SubscriberTrend[];

  @ApiProperty({ type: () => [SystemMetrics], description: '시스템 지표 목록' })
  systemMetrics!: SystemMetrics[];
}

export class ReportQueryDto {
  @ApiProperty({ required: false, enum: ['daily', 'weekly', 'monthly'], description: '조회 기간 단위' })
  timeRange?: TimeRange;

  @ApiProperty({ required: false, description: '조회 시작일 (YYYY-MM-DD)' })
  startDate?: string;

  @ApiProperty({ required: false, description: '조회 종료일 (YYYY-MM-DD)' })
  endDate?: string;

  @ApiProperty({ required: false, description: '상품 ID 필터' })
  productId?: string;

  @ApiProperty({ required: false, enum: ['all', 'vip', 'general'], description: '고객 세그먼트 필터' })
  segment?: 'all' | 'vip' | 'general';
}
