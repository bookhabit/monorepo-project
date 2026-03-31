import { atom } from 'jotai';

export interface OrderInput {
  price: number;
  quantity: number;
  orderType: 'buy' | 'sell';
}

export interface AccountBalance {
  cash: number;
  stockQuantity: number;
}

// 주문 입력 상태
export const orderInputAtom = atom<OrderInput>({
  price: 0,
  quantity: 0,
  orderType: 'buy',
});

// 계좌 잔고
export const accountBalanceAtom = atom<AccountBalance>({
  cash: 10000000, // 1000만원
  stockQuantity: 0,
});

// 주문 가능 수량 계산 (derived atom)
export const maxBuyQuantityAtom = atom((get) => {
  const { cash } = get(accountBalanceAtom);
  const { price } = get(orderInputAtom);
  
  if (price === 0) return 0;
  return Math.floor(cash / price);
});

// 주문 모달 상태
export const orderModalOpenAtom = atom<boolean>(false);
