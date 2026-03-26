# 커밋 컨벤션

## 기본 형식

```
<type>(<scope>): <subject>

[body]

[footer]
```

## Type 목록

| Type | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 추가 | `feat(orderbook): 호가창 실시간 WebSocket 연결 구현` |
| `fix` | 버그 수정 | `fix(funnel): 뒤로가기 시 입력값 초기화되는 문제 수정` |
| `refactor` | 기능 변화 없는 코드 개선 | `refactor(loan): 심사 로직을 커스텀 훅으로 분리` |
| `style` | 코드 포맷팅, 세미콜론 등 (로직 변경 없음) | `style: prettier 적용` |
| `test` | 테스트 코드 추가/수정 | `test(orderbook): 호가 계산 유틸 단위 테스트 추가` |
| `docs` | 문서 작성/수정 | `docs: 커밋 컨벤션 정리` |
| `chore` | 빌드 설정, 패키지 설치 등 | `chore: eslint 설정 추가` |
| `perf` | 성능 개선 | `perf(orderbook): throttle 적용으로 리렌더 최소화` |
| `ci` | CI/CD 설정 변경 | `ci: GitHub Actions 정적 분석 워크플로우 추가` |
| `revert` | 이전 커밋 되돌리기 | `revert: feat(funnel): 계좌 개설 3단계 추가` |

## Scope 목록

```
funnel        - 주식 계좌 개설 앱
orderbook     - 실시간 호가창 앱
dashboard     - 보유 자산 대시보드 앱
notification  - 알림 센터 앱
loan-admin    - 대출 심사 Admin 앱
fds           - 이상 거래 탐지 앱
console       - 고객 상담 콘솔 앱
report        - 운영 리포트 앱
ui            - 공통 디자인 시스템 (packages/ui)
shared        - 공통 타입/스키마 (packages/shared)
config        - 루트 설정 (tsconfig, eslint, prettier 등)
```

## 규칙

- **subject**: 명령형 현재형으로 작성 (`추가했다` ✕ → `추가` ✓)
- **subject 길이**: 72자 이내
- **body**: 무엇을(What)보다 왜(Why)를 설명
- **footer**: `BREAKING CHANGE:` 또는 이슈 참조 (`Closes #123`)

## 실제 예시

### feat - 새 기능
```
feat(orderbook): 호가 클릭 시 주문창 자동 입력 구현

호가 행 클릭 이벤트를 Jotai atom과 연결하여
클릭 즉시 주문 가격 필드에 반영되도록 처리.
매수 가능 수량은 보유 현금 / 호가 가격으로 실시간 계산.
```

### refactor - 관심사 분리
```
refactor(loan): 심사 목록 뷰와 필터 로직 분리

기존 LoanListPage에 뷰와 필터 상태가 혼재하여 확장성이 낮았음.
useLoanFilter 훅을 추출하고 URL searchParams와 동기화하는 로직을
컴포넌트 외부로 이동.
```

### perf - 성능 최적화
```
perf(orderbook): 호가 데이터 throttle 100ms 적용

WebSocket 메시지가 초당 50회 이상 수신되어 메인 스레드 점유 발생.
throttle 100ms 적용 후 Long Task 제거 확인 (Performance 탭 검증).
```

### fix - 버그 수정
```
fix(funnel): 새로고침 후 Funnel 단계 초기화되는 문제 수정

Jotai atom이 메모리에만 저장되어 새로고침 시 1단계로 복귀.
atomWithStorage로 교체하여 sessionStorage에 단계 정보 유지.

Closes #42
```

### chore - 설정
```
chore(config): ESLint flat config 및 Prettier 초기 설정

- ESLint 10 flat config 도입 (eslint.config.mjs)
- react-hooks, @typescript-eslint 규칙 적용
- Prettier 포맷 통일 (singleQuote, trailingComma: all)
```

## PR 전략

```
# 기능 단위로 브랜치 분리
feat/orderbook-websocket
feat/loan-admin-filter
refactor/funnel-hooks-separation
fix/notification-optimistic-update

# PR 제목 = 커밋 타입과 동일하게
feat(orderbook): 실시간 호가창 구현
```

## 나쁜 예시 (금지)

```bash
# ✕ 의미없는 커밋
git commit -m "수정"
git commit -m "fix bug"
git commit -m "wip"
git commit -m "asdf"

# ✕ 여러 관심사 혼합
git commit -m "feat: 호가창 구현 및 버그 수정 및 스타일 변경"
```
