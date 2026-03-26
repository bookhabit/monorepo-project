# 아이콘 시스템

`@mono/ui` 패키지의 아이콘은 **SVG 파일 기반 파이프라인**으로 관리됩니다.
피그마에서 SVG를 익스포트하면 스크립트가 자동으로 TSX 컴포넌트로 변환합니다.

---

## 디렉토리 구조

```
packages/ui/
├── scripts/
│   ├── preprocess-svg.cjs   # SVG 색상 정규화 (→ currentColor)
│   ├── build-icons.cjs      # SVG → TSX 컴포넌트 변환
│   └── generate-index.cjs   # generated/index.ts 자동 생성
└── src/icons/
    ├── svg/                 # 소스 SVG 파일 (카테고리별 폴더)
    │   ├── action/
    │   ├── chevron/
    │   ├── finance/
    │   ├── media/
    │   ├── navigation/
    │   └── status/
    ├── generated/           # 자동 생성 TSX (수동 편집 금지)
    │   ├── Home.tsx
    │   ├── ...
    │   └── index.ts
    ├── index.ts             # export * from './generated'
    └── types.ts             # IconProps 타입 정의
```

---

## 아이콘 추가 워크플로우

### 1. 피그마에서 SVG 익스포트

피그마에서 아이콘 프레임을 선택 → **Export as SVG** → `src/icons/svg/{카테고리}/` 에 저장.

파일명 규칙: `kebab-case.svg` (예: `chevron-left.svg`, `stock-up.svg`)

카테고리 폴더가 없으면 새로 만들어도 됩니다. 스크립트가 재귀적으로 탐색합니다.

### 2. 파이프라인 실행

```bash
yarn workspace @mono/ui icons
```

내부적으로 세 단계가 순서대로 실행됩니다:

| 단계 | 스크립트 | 역할 |
|------|----------|------|
| 1 | `icons:pre` | 피그마 익스포트의 하드코딩 색상을 `currentColor`로 교체 |
| 2 | `icons:build` | SVG → TSX 컴포넌트 생성 (`src/icons/generated/`) |
| 3 | `icons:index` | `generated/index.ts` 재생성 |

### 3. 확인

```bash
# 생성된 아이콘 목록 확인
ls packages/ui/src/icons/generated/
```

---

## 변환 규칙

### 파일명 → 컴포넌트명

`kebab-case.svg` → `PascalCaseIcon` (컴포넌트) + `PascalCase.tsx` (파일)

```
chevron-left.svg  →  ChevronLeftIcon  (ChevronLeft.tsx)
stock-up.svg      →  StockUpIcon      (StockUp.tsx)
```

### SVG 속성 처리

- 자식 요소의 `stroke`, `strokeWidth`, `strokeLinecap`, `strokeLinejoin` 제거 → 부모 `<svg>`에서 props로 일괄 적용 (CSS 상속)
- `fill="currentColor"` 유지 (점(dot), 채움 아이콘 등 명시적 fill 요소)
- SVG 속성 → JSX 카멜케이스 자동 변환 (`stroke-width` → `strokeWidth` 등)

### 생성되는 컴포넌트 구조

```tsx
export function ChevronLeftIcon({
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.8,
  className,
  'aria-label': ariaLabel,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color }}   // CSS currentColor 상속용
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      {/* SVG inner content */}
    </svg>
  );
}
```

---

## 사용법

```tsx
import { HomeIcon, ChevronLeftIcon, WalletIcon } from '@mono/ui';

// 기본 (24px, currentColor)
<HomeIcon />

// 크기, 색상 지정
<WalletIcon size={28} color={colors.blue500} />

// strokeWidth 조정
<ChevronLeftIcon size={20} strokeWidth={2.5} />

// 접근성 레이블
<SearchIcon aria-label="검색" />
```

### IconProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `size` | `number` | `24` | width/height (px) |
| `color` | `string` | `'currentColor'` | stroke 색상 |
| `strokeWidth` | `number` | `1.8` | 선 굵기 |
| `className` | `string` | - | 추가 클래스 |
| `aria-label` | `string` | - | 접근성 레이블 (없으면 `aria-hidden`) |

---

## 현재 아이콘 목록 (53개)

| 카테고리 | 아이콘 |
|----------|--------|
| Navigation | Home, History, Settings, Profile, Notification, Search, Menu |
| Chevron & Arrow | ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowLeft, ArrowRight |
| Action | Close, Check, Plus, Minus, Edit, Delete, MoreVertical, MoreHorizontal, Filter, Upload, Download, Copy, Refresh, Share |
| Status | CheckCircle, XCircle, AlertCircle, InfoCircle, AlertTriangle, Lock, Eye, EyeOff |
| Finance | Wallet, Card, Transfer, ChartLine, ChartBar, Exchange, Bank, Receipt, Coin, StockUp, StockDown |
| Media | Image, Camera, Document, Calendar, Clipboard, Phone, Mail |

---

## 주의사항

- `src/icons/generated/` 폴더는 **수동 편집 금지** — 파이프라인 실행 시 덮어씌워집니다.
- SVG 소스 파일은 `src/icons/svg/` 에서 관리하세요.
- 같은 이름의 SVG가 여러 카테고리 폴더에 있으면 마지막에 처리된 파일이 덮어씁니다. 파일명을 고유하게 유지하세요.
