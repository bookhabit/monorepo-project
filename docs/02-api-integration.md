# API 연동 코드 규칙

## API 클라이언트 설정

`@mono/shared/api`의 `createApiClient` 팩토리로 앱별 독립 인스턴스를 생성한다.
싱글턴 공유 금지 — 앱마다 `src/shared/api/client.ts`를 만들어 주입한다.

```typescript
// src/shared/api/client.ts
import { createApiClient } from '@mono/shared/api';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export const { http } = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  getAccessToken: () => useAuthStore.getState().token,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  onTokenRefreshed: (at, rt) => useAuthStore.getState().setAuth(at, rt),
  onAuthFailure: () => {
    useAuthStore.getState().clearAuth();
    window.location.href = '/login';
  },
});
```

`http` 객체가 제공하는 것:
- 요청 시 `Authorization: Bearer` 자동 주입
- 401 발생 시 토큰 갱신 → 원래 요청 재시도 → 실패 시 `onAuthFailure` 호출
- `http.auth.post` — 토큰 없이 호출 (로그인, 회원가입)

---

## Schema 정의 (Zod 필수)

모든 API 응답은 Zod 스키마로 검증한다.
TypeScript 타입만으로는 런타임 보장 없음 — 서버 계약이 깨져도 조용히 통과됨.

```typescript
// features/matches/schemas/match.schema.ts
import { z } from 'zod';

export const matchSchema = z.object({
  id: z.string(),
  homeTeamId: z.string(),
  awayTeamId: z.string().nullable(),
  matchDate: z.string().datetime(),
  location: z.string(),
  status: z.enum(['OPEN', 'MATCHED', 'COMPLETED']),
});

export const matchListSchema = z.array(matchSchema);

// Zod에서 타입 추출 — 별도 interface 선언 금지
export type Match = z.infer<typeof matchSchema>;
```

---

## Service 레이어 패턴

Service는 순수 함수. React import 금지, Hook 사용 금지.
스키마 검증은 Service 레이어에서 수행한다.

```typescript
// features/matches/services/match.service.ts
import { http } from '@/shared/api/client';
import { matchListSchema, matchSchema, type Match } from '../schemas/match.schema';
import type { MatchFilters, CreateMatchInput } from '../types';

export const matchService = {
  // GET — 응답을 스키마로 파싱 (런타임 검증)
  getList: async (filters: MatchFilters): Promise<Match[]> => {
    const data = await http.get('/matches', filters);
    return matchListSchema.parse(data);
  },

  getById: async (id: string): Promise<Match> => {
    const data = await http.get(`/matches/${id}`);
    return matchSchema.parse(data);
  },

  // POST — 요청 타입은 Zod 스키마에서 추론
  create: async (input: CreateMatchInput): Promise<Match> => {
    const data = await http.post('/matches', input);
    return matchSchema.parse(data);
  },

  apply: async (id: string): Promise<void> => {
    await http.post(`/matches/${id}/apply`);
  },
};
```

---

## Query Key 규칙

queryKeys는 상수 객체로 중앙 관리한다.
인라인 문자열 배열 사용 금지 — `invalidateQueries` 시 오타 방지.

```typescript
// features/matches/hooks/queries/matchQueryKeys.ts
export const matchQueryKeys = {
  all: ['matches'] as const,
  list: (filters: MatchFilters) => ['matches', 'list', filters] as const,
  detail: (id: string) => ['matches', 'detail', id] as const,
};
```

---

## Data Hook 패턴 (useQuery / useMutation)

```typescript
// features/matches/hooks/queries/useMatchList.ts
import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/match.service';
import { matchQueryKeys } from './matchQueryKeys';

export function useMatchList(filters: MatchFilters) {
  return useQuery({
    queryKey: matchQueryKeys.list(filters),
    queryFn: () => matchService.getList(filters),
  });
}

// 낙관적 업데이트 패턴
// features/matches/hooks/queries/useCreateMatch.ts
export function useCreateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: matchService.create,
    onSuccess: () => {
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: matchQueryKeys.all });
    },
    onError: (error) => {
      // ApiError 타입으로 분기 가능
      if (isApiError(error) && error.code === 'MATCH_ALREADY_EXISTS') {
        // 도메인 에러 처리
      }
    },
  });
}
```

---

## Logic Hook 패턴 (폼 + 뮤테이션 연결)

폼이 있는 화면은 Data Hook과 별도로 Logic Hook을 만들어 UI와 서버를 연결한다.

```typescript
// features/auth/hooks/useLoginForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '../schemas/auth.schema';
import { useLoginMutation } from './queries/useAuthMutation';

export function useLoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const { mutate, isPending } = useLoginMutation();

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onError: (error) => {
        if (isApiError(error) && error.code === 'INVALID_CREDENTIALS') {
          form.setError('password', { message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }
      },
    });
  });

  return { ...form, onSubmit, isPending };
}
```

---

## POST 데이터 흐름 요약

```
사용자 입력
  → React Hook Form (입력 관리)
  → Zod 검증 (zodResolver)
  → Logic Hook onSubmit
  → useMutation (Data Hook)
  → Service (순수 HTTP 호출)
  → 성공: 캐시 invalidate + 이동
  → 실패: ApiError 코드로 form.setError 분기
```

## GET 데이터 흐름 요약

```
Service (HTTP + Zod 파싱)
  → useQuery (Data Hook)
  → Container (isLoading / isError 분기)
  → View (props 렌더링)
```
