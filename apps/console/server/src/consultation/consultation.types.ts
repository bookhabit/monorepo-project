import { ApiProperty } from '@nestjs/swagger';

export type ConsultationCategory = 'account' | 'loan' | 'card' | 'investment' | 'technical' | 'complaint';
export type ConsultationStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type ConsultationPriority = 'low' | 'medium' | 'high' | 'urgent';

export class Consultation {
  @ApiProperty({ description: '상담 고유 ID' })
  id!: string;

  @ApiProperty({ description: '고객 ID' })
  customerId!: string;

  @ApiProperty({ description: '상담사 ID' })
  agentId!: string;

  @ApiProperty({ description: '상담사 이름' })
  agentName!: string;

  @ApiProperty({ enum: ['account', 'loan', 'card', 'investment', 'technical', 'complaint'], description: '상담 카테고리' })
  category!: ConsultationCategory;

  @ApiProperty({ description: '상담 제목' })
  subject!: string;

  @ApiProperty({ description: '상담 내용' })
  content!: string;

  @ApiProperty({ enum: ['open', 'in-progress', 'resolved', 'closed'], description: '상담 상태' })
  status!: ConsultationStatus;

  @ApiProperty({ enum: ['low', 'medium', 'high', 'urgent'], description: '우선순위' })
  priority!: ConsultationPriority;

  @ApiProperty({ description: '생성일 (ISO 8601)' })
  createdAt!: string;

  @ApiProperty({ description: '수정일 (ISO 8601)' })
  updatedAt!: string;

  @ApiProperty({ required: false, description: '해결일 (ISO 8601)' })
  resolvedAt?: string;

  @ApiProperty({ required: false, type: [String], description: '태그 목록' })
  tags?: string[];
}

export class ConsultationTemplate {
  @ApiProperty({ description: '템플릿 고유 ID' })
  id!: string;

  @ApiProperty({ enum: ['account', 'loan', 'card', 'investment', 'technical', 'complaint'], description: '상담 카테고리' })
  category!: ConsultationCategory;

  @ApiProperty({ description: '템플릿 제목' })
  title!: string;

  @ApiProperty({ description: '템플릿 내용' })
  content!: string;

  @ApiProperty({ description: '사용 횟수' })
  usageCount!: number;
}

export class CreateConsultationDto {
  @ApiProperty({ description: '고객 ID' })
  customerId!: string;

  @ApiProperty({ enum: ['account', 'loan', 'card', 'investment', 'technical', 'complaint'], description: '상담 카테고리' })
  category!: ConsultationCategory;

  @ApiProperty({ description: '상담 제목' })
  subject!: string;

  @ApiProperty({ description: '상담 내용' })
  content!: string;

  @ApiProperty({ enum: ['low', 'medium', 'high', 'urgent'], description: '우선순위' })
  priority!: ConsultationPriority;

  @ApiProperty({ required: false, type: [String], description: '태그 목록' })
  tags?: string[];
}
