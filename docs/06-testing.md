# 테스트 코드 가이드

## 테스트 전략

```
Unit Test     → 유틸 함수, 순수 계산 로직
Integration   → React Query + API (msw mock)
Component     → 사용자 인터랙션 (Testing Library)
E2E           → 핵심 플로우 (Playwright)
```

## 도구 스택

- **Vitest**: 단위/통합 테스트 러너 (Vite 환경)
- **@testing-library/react**: 컴포넌트 테스트
- **msw**: API 모킹 (실제 fetch 인터셉트)
- **Playwright**: E2E

## 패턴 예시

### 유틸 테스트

```typescript
import { describe, it, expect } from 'vitest';
import { calculateBuyableQuantity } from './orderbook.utils';

describe('calculateBuyableQuantity', () => {
  it('보유 현금과 가격으로 매수 가능 수량을 계산한다', () => {
    expect(calculateBuyableQuantity({ cash: 100_000, price: 70_500 })).toBe(1);
    expect(calculateBuyableQuantity({ cash: 200_000, price: 70_500 })).toBe(2);
  });
});
```

### 컴포넌트 테스트 (msw 연동)

```typescript
import { render, screen, userEvent } from '@testing-library/react';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

it('호가 클릭 시 주문창에 가격이 입력된다', async () => {
  server.use(
    http.get('/api/orderbook/005930', () =>
      HttpResponse.json(mockOrderbook)
    )
  );

  render(<OrderbookPage />);
  await userEvent.click(screen.getByText('70,500'));
  expect(screen.getByLabelText('주문 가격')).toHaveValue('70500');
});
```

## 테스트 커버리지 기준

- 비즈니스 로직 유틸: **90%+**
- 핵심 사용자 플로우: **반드시 E2E 존재**
- UI 컴포넌트: **인터랙션 위주** (스냅샷 지양)
