import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CreateOrderRequest } from '../schemas/order.schema';

interface OrderViewProps {
  form: UseFormReturn<CreateOrderRequest>;
  isPending: boolean;
  handleSubmit: () => void;
}

export default function OrderView({ form, isPending, handleSubmit }: OrderViewProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  // 실시간 값 감시 (총액 계산용)
  const side = watch('side');
  const price = watch('price') || 0;
  const quantity = watch('quantity') || 0;
  const totalAmount = price * quantity;
  const isFormInvalid = price <= 0 || quantity <= 0;

  console.log('주문 form 값:', { side, price, quantity });

  return (
    <div
      style={{
        backgroundColor: '#1a1d26',
        color: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '360px',
      }}
    >
      <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>주문</h2>

      {/* 매수/매도 탭 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setValue('side', 'buy')}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: side === 'buy' ? '#22c55e' : '#2d3343',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <span>↑</span> 매수
        </button>
        <button
          onClick={() => setValue('side', 'sell')}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: side === 'sell' ? '#ef4444' : '#2d3343',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <span>↓</span> 매도
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 주문 가격 */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}
          >
            주문 가격
          </label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2d3343',
              border: '1px solid #374151',
              borderRadius: '4px',
              color: '#fff',
            }}
          />
        </div>

        {/* 주문 수량 */}
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <label style={{ fontSize: '12px', color: '#9ca3af' }}>주문 수량</label>
            <button
              type="button"
              style={{
                fontSize: '12px',
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                padding: '2px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              최대
            </button>
          </div>
          <input
            type="number"
            {...register('quantity', { valueAsNumber: true })}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2d3343',
              border: '1px solid #374151',
              borderRadius: '4px',
              color: '#fff',
            }}
          />
        </div>

        {/* 요약 정보 영역 */}
        <div
          style={{
            backgroundColor: '#242935',
            padding: '16px',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              fontSize: '14px',
            }}
          >
            <span style={{ color: '#9ca3af' }}>🗒 주문 총액</span>
            <span style={{ color: '#3b82f6' }}>{totalAmount.toLocaleString()}원</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: '#9ca3af' }}>
              👛 {side === 'buy' ? '매수 가능' : '매도 가능'}
            </span>
            <span>0{side === 'buy' ? '원' : '주'}</span>
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isPending || isFormInvalid}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: isPending ? '#4b5563' : '#4b5563', // 원본 이미지 색상 기준
            color: '#fff',
            fontWeight: 'bold',
            cursor: isPending || isFormInvalid ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          {side === 'buy' ? '매수 주문' : '매도 주문'}
        </button>
      </form>
    </div>
  );
}
