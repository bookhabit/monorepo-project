export type ConsultationCategory = 'account' | 'loan' | 'card' | 'investment' | 'technical' | 'complaint';
export type ConsultationStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type ConsultationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Consultation {
  id: string;
  customerId: string;
  agentId: string;
  agentName: string;
  category: ConsultationCategory;
  subject: string;
  content: string;
  status: ConsultationStatus;
  priority: ConsultationPriority;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  tags?: string[];
}

export interface ConsultationTemplate {
  id: string;
  category: ConsultationCategory;
  title: string;
  content: string;
  usageCount: number;
}

export interface CreateConsultationDto {
  customerId: string;
  category: ConsultationCategory;
  subject: string;
  content: string;
  priority: ConsultationPriority;
  tags?: string[];
}
