export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  customerId: string;
  accountNumber: string;
  tier: 'vip' | 'gold' | 'silver' | 'bronze';
  status: 'active' | 'dormant' | 'restricted';
  registeredAt: string;
  lastContactAt: string;
  totalAssets: number;
  profileImage?: string;
  address?: string;
  birthDate?: string;
  creditScore?: number;
}

export interface Transaction {
  id: string;
  customerId: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  amount: number;
  balance: number;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  counterparty?: string;
}

export interface Consultation {
  id: string;
  customerId: string;
  agentId: string;
  agentName: string;
  category: 'account' | 'loan' | 'card' | 'investment' | 'technical' | 'complaint';
  subject: string;
  content: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  tags?: string[];
}

export interface ConsultationTemplate {
  id: string;
  category: Consultation['category'];
  title: string;
  content: string;
  usageCount: number;
}

export interface CreateConsultationInput {
  customerId: string;
  category: Consultation['category'];
  subject: string;
  content: string;
  priority: Consultation['priority'];
  tags?: string[];
}

export interface CustomerFilters {
  search?: string;
  tier?: Customer['tier'];
  status?: Customer['status'];
}
