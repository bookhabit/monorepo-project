import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { websocketMock, OrderBookData } from '../services/websocket-mock';

export function useOrderBookData() {
  const [orderBookData, setOrderBookData] = useState<OrderBookData | null>(null);

  useEffect(() => {
    // WebSocket 연결
    websocketMock.connect((data) => {
      setOrderBookData(data);
    });

    // 클린업
    return () => {
      websocketMock.disconnect();
    };
  }, []);

  // React-Query로 데이터 관리
  return useQuery({
    queryKey: ['orderbook'],
    queryFn: () => orderBookData,
    enabled: orderBookData !== null,
    refetchInterval: false, // WebSocket에서 실시간 업데이트하므로 불필요
    staleTime: Infinity,
  });
}
