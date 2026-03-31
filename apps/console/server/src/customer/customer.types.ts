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
  address: string;
  birthDate: string;
  creditScore: number;
}

export interface CustomerTransaction {
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

export interface CustomerFilters {
  search?: string;
  tier?: Customer['tier'];
  status?: Customer['status'];
}
