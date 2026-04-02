import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { OrderBookData, OrderBookDataSchema } from '../schemas/orderBook.schema';

export function useOrderbook() {
  const [data, setData] = useState<OrderBookData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔄 재시도를 트리거하기 위한 상태 (값이 바뀔 때마다 useEffect가 재실행됨)
  const [retryCount, setRetryCount] = useState(0);

  // 외부에서 호출할 재시도 함수
  const refetch = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(true);
    setRetryCount((prev) => prev + 1); // 의존성 배열의 값을 변경
  }, []);

  useEffect(() => {
    console.log('🚀 [WebSocket] 소켓 연결 시도 중... (시도 횟수: %d)', retryCount + 1);

    const socket: Socket = io('http://localhost:4002', {
      withCredentials: true,
      transports: ['websocket'],
      reconnectionAttempts: 5, // 자동 재연결 시도 횟수 (선택 사항)
    });

    socket.on('connect', () => {
      console.log('🌐 [WebSocket] 연결됨 (ID: %s)', socket.id);
      setError(null);
    });

    socket.on('orderbook', (rawData) => {
      const result = OrderBookDataSchema.safeParse(rawData);
      if (result.success) {
        setData(result.data);
        setError(null);
        setIsLoading(false);
      } else {
        console.error('❌ [WebSocket] 검증 실패');
        setError('데이터 형식이 올바르지 않습니다.');
      }
    });

    socket.on('connect_error', (err) => {
      console.error('❌ [WebSocket] 연결 에러:', err.message);
      setError('서버와 연결할 수 없습니다.');
      setIsLoading(false);
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 [WebSocket] 연결 종료:', reason);
      if (reason !== 'io client disconnect') {
        setError('연결이 끊어졌습니다.');
      }
    });

    // 클린업: retryCount가 바뀌어 재실행될 때도 기존 소켓을 확실히 닫음
    return () => {
      console.log('🧹 [WebSocket] 이전 소켓 정리');
      socket.disconnect();
    };
  }, [retryCount]); // 👈 핵심: retryCount가 바뀔 때마다 이 Effect가 다시 돌아감

  return { data, isLoading, error, refetch };
}
