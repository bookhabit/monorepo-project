import { ApiProperty } from '@nestjs/swagger';

export type LoanStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';
export type RiskLevel = 'low' | 'medium' | 'high';
export type UserRole = 'reviewer' | 'manager' | 'admin';

export class LoanApplication {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  applicantName!: string;

  @ApiProperty()
  applicantId!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  purpose!: string;

  @ApiProperty()
  creditScore!: number;

  @ApiProperty()
  monthlyIncome!: number;

  @ApiProperty()
  employmentYears!: number;

  @ApiProperty({ enum: ['pending', 'reviewing', 'approved', 'rejected'] })
  status!: LoanStatus;

  @ApiProperty()
  appliedAt!: string;

  @ApiProperty({ required: false })
  reviewedAt?: string;

  @ApiProperty({ required: false })
  reviewedBy?: string;

  @ApiProperty({ enum: ['low', 'medium', 'high'] })
  riskLevel!: RiskLevel;

  @ApiProperty({ type: [String] })
  documents!: string[];
}

export class LoanReviewHistory {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  applicationId!: string;

  @ApiProperty({ enum: ['submitted', 'approved', 'rejected', 'review_started', 'rejection_cancelled'] })
  action!: 'submitted' | 'approved' | 'rejected' | 'review_started' | 'rejection_cancelled';

  @ApiProperty()
  performedBy!: string;

  @ApiProperty()
  performedAt!: string;

  @ApiProperty({ required: false })
  note?: string;

  @ApiProperty({ required: false, enum: ['pending', 'reviewing', 'approved', 'rejected'] })
  previousStatus?: LoanStatus;

  @ApiProperty({ required: false, enum: ['pending', 'reviewing', 'approved', 'rejected'] })
  newStatus?: LoanStatus;
}

export class LoanPage {
  @ApiProperty({ type: () => [LoanApplication] })
  data!: LoanApplication[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  pageSize!: number;

  @ApiProperty()
  totalPages!: number;
}
