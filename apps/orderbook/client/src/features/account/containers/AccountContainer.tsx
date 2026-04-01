import AccountView from '@/features/account/views/AccountView';
import React from 'react';
import { useAccountQuery } from '../hooks/useAccountQuery';

export default function AccountContainer() {
  // 계좌 정보 상태 관리 훅
  const { data } = useAccountQuery();
  console.log('account data', data);
  // 계좌 정보 ui에 데이터 전달
  return <AccountView cash={data?.cash || 0} stockQuantity={data?.stockQuantity || 0} />;
}
