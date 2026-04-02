import AccountView from '@/features/account/views/AccountView';
import { useAccountQuery } from '../hooks/useAccountQuery';

export default function AccountContainer() {
  const { data } = useAccountQuery();
  return <AccountView cash={data.cash} stockQuantity={data.stockQuantity} />;
}
