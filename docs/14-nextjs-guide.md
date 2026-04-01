# Next.js App Router 완전 가이드

> 출처: https://nextjs.org/docs/app/getting-started
> Next.js App Router 기준으로 정리한 시작 가이드 전체 요약

---

## 목차

1. [Installation](#1-installation)
2. [Project Structure](#2-project-structure)
3. [Layouts and Pages](#3-layouts-and-pages)
4. [Linking and Navigating](#4-linking-and-navigating)
5. [Server and Client Components](#5-server-and-client-components)
6. [Fetching Data](#6-fetching-data)
7. [Mutating Data](#7-mutating-data)
8. [Caching](#8-caching)
9. [Revalidating](#9-revalidating)
10. [Error Handling](#10-error-handling)
11. [CSS](#11-css)
12. [Image Optimization](#12-image-optimization)
13. [Font Optimization](#13-font-optimization)
14. [Metadata and OG Images](#14-metadata-and-og-images)
15. [Route Handlers](#15-route-handlers)
16. [Deploying](#16-deploying)
17. [Upgrading](#17-upgrading)

---

## 1. Installation

### 시스템 요구사항

- Node.js **20.9** 이상
- 지원 브라우저: Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+

### 빠른 시작

```bash
# pnpm (권장)
pnpm create next-app@latest my-app --yes
cd my-app
pnpm dev

# npm
npx create-next-app@latest my-app --yes
cd my-app
npm run dev
```

> `--yes` 플래그: TypeScript, Tailwind CSS, ESLint, App Router, `@/*` import alias 기본값으로 설정

### 수동 설치

```bash
npm i next@latest react@latest react-dom@latest
```

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

### 필수 파일 구성

```tsx
// app/layout.tsx - 루트 레이아웃 (필수)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// app/page.tsx - 홈 페이지
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

### TypeScript 설정

파일 확장자를 `.tsx`로 변경 후 `next dev` 실행 → 자동으로 `tsconfig.json` 생성
최소 TypeScript 버전: **v5.1.0**

### 절대경로 임포트

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```

### 주요 변경사항

- Next.js 16부터 `next build`가 linter를 자동 실행하지 않음
- Turbopack이 기본 번들러 (Webpack은 `--webpack` 플래그로 사용)

---

## 2. Project Structure

### 최상위 폴더

| 폴더 | 용도 |
|------|------|
| `app/` | App Router (주 라우팅 폴더) |
| `pages/` | Pages Router (레거시) |
| `public/` | 정적 에셋 (`/` URL로 접근) |
| `src/` | 선택적 소스 폴더 |

### 주요 파일

| 파일 | 용도 |
|------|------|
| `next.config.js` | Next.js 설정 |
| `instrumentation.ts` | OpenTelemetry 계측 |
| `.env.local` | 환경변수 |
| `tsconfig.json` | TypeScript 설정 |

### 라우팅 파일 컨벤션

| 파일명 | 용도 |
|--------|------|
| `layout.tsx` | 공유 레이아웃 |
| `page.tsx` | 페이지 UI |
| `loading.tsx` | 로딩 UI (Suspense 경계) |
| `not-found.tsx` | 404 UI |
| `error.tsx` | 에러 UI (Error Boundary) |
| `global-error.tsx` | 글로벌 에러 UI |
| `route.ts` | API 엔드포인트 |
| `template.tsx` | 리렌더링되는 레이아웃 |

### 동적 라우트 패턴

| 경로 | URL 패턴 |
|------|----------|
| `app/blog/[slug]/page.tsx` | `/blog/my-first-post` |
| `app/shop/[...slug]/page.tsx` | `/shop/clothing/shirts` |
| `app/docs/[[...slug]]/page.tsx` | `/docs`, `/docs/api/ref` |

### 특수 폴더 패턴

| 패턴 | 의미 |
|------|------|
| `(marketing)/` | Route Group — URL에서 제외 |
| `_components/` | Private 폴더 — 라우팅 불가 |
| `@sidebar/` | Named Slot (Parallel Routes) |
| `(.)folder` | Intercepting Route (같은 레벨) |
| `(..)folder` | Intercepting Route (부모 레벨) |
| `(...)folder` | Intercepting Route (루트부터) |

### 컴포넌트 렌더링 순서

```
layout.tsx
  └── template.tsx
        └── error.tsx (Error Boundary)
              └── loading.tsx (Suspense Boundary)
                    └── not-found.tsx (Error Boundary)
                          └── page.tsx
```

### 프로젝트 구성 전략

1. **`app/` 외부에 공유 코드 배치** — `app/`은 순수하게 라우팅 전용
2. **`app/` 루트에 모든 코드 배치** — 모든 코드를 `app/` 안에
3. **기능/라우트별 코드 분리** — 공유 코드는 루트, 특정 코드는 각 라우트 세그먼트에

> Next.js는 프로젝트 구성에 대해 의견을 강요하지 않음 (unopinionated)

---

## 3. Layouts and Pages

### 페이지 생성

```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

### 레이아웃 생성

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>{/* 네비게이션 */}</nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
```

**레이아웃 특성:**
- 네비게이션 시 상태를 유지하고 리렌더링되지 않음
- 루트 레이아웃은 `<html>`과 `<body>` 태그 포함 필수

### 중첩 라우트

```tsx
// app/blog/page.tsx
import { getPosts } from '@/lib/posts'

export default async function Page() {
  const posts = await getPosts()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### 동적 세그먼트

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  return <h1>{post.title}</h1>
}
```

### searchParams 활용

```tsx
// app/page.tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const filters = (await searchParams).filters
  // ...
}
```

**searchParams 사용 시점:**
- 서버에서 DB 쿼리에 사용 → `searchParams` prop (Server Component)
- 클라이언트에서만 필터링 → `useSearchParams()` hook (Client Component)
- 이벤트 핸들러에서 → `new URLSearchParams(window.location.search)`

### 타입 헬퍼 (자동 생성)

```tsx
// PageProps, LayoutProps는 전역으로 사용 가능 (import 불필요)
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  return <h1>{slug}</h1>
}
```

> `next dev`, `next build`, `next typegen` 실행 시 자동 생성

---

## 4. Linking and Navigating

### 네비게이션 동작 원리

1. **서버 렌더링** — 레이아웃/페이지는 기본적으로 Server Component
2. **프리페칭** — `<Link>` 컴포넌트가 뷰포트에 들어오면 백그라운드에서 라우트 로드
3. **스트리밍** — 동적 라우트의 렌더링된 부분을 순차적으로 전송
4. **클라이언트 전환** — 전체 페이지 리로드 없이 콘텐츠 업데이트

### Link 컴포넌트

```tsx
import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <Link href="/blog">Blog</Link>  {/* 프리페칭 O */}
      <a href="/contact">Contact</a>  {/* 프리페칭 X */}
    </nav>
  )
}
```

### 프리페칭 동작

| 라우트 유형 | 동작 |
|------------|------|
| Static Route | 전체 라우트 프리페치 |
| Dynamic Route | `loading.tsx`가 있으면 부분 프리페치, 없으면 스킵 |

### 로딩 UI (스트리밍)

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div>로딩 중...</div>
}
```

Next.js가 자동으로 `page.tsx`를 `<Suspense>`로 감쌈

**장점:**
- 즉각적인 네비게이션 및 시각적 피드백
- 네비게이션 인터럽트 가능
- Core Web Vitals 개선 (TTFB, FCP, TTI)

### 느린 네트워크 처리

```tsx
'use client'
import { useLinkStatus } from 'next/link'

export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return (
    <span className={`link-hint ${pending ? 'is-pending' : ''}`} />
  )
}
```

### 프리페칭 비활성화

```tsx
<Link prefetch={false} href="/blog">Blog</Link>
```

> 대량의 링크 목록에서 불필요한 리소스 사용 방지

### Hover 시 프리페칭

```tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'

function HoverPrefetchLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [active, setActive] = useState(false)
  return (
    <Link href={href} prefetch={active ? null : false} onMouseEnter={() => setActive(true)}>
      {children}
    </Link>
  )
}
```

### Native History API

```tsx
// pushState — 히스토리 스택에 추가 (뒤로가기 가능)
window.history.pushState(null, '', `?${params.toString()}`)

// replaceState — 현재 항목 교체 (뒤로가기 불가)
window.history.replaceState(null, '', newPath)
```

---

## 5. Server and Client Components

### 선택 기준

| Server Component | Client Component |
|-----------------|-----------------|
| DB/API에서 데이터 페치 | `onClick`, `onChange` 이벤트 핸들러 |
| API 키, 토큰 보호 | `useState`, `useEffect` 등 lifecycle |
| 클라이언트로 보내는 JS 최소화 | `localStorage`, `window` 등 브라우저 API |
| 초기 로드 성능 개선 (FCP) | 커스텀 훅 |

### Server Component (기본값)

```tsx
// app/[id]/page.tsx
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <div>
      <h1>{post.title}</h1>
      <LikeButton likes={post.likes} />
    </div>
  )
}
```

### Client Component

```tsx
// app/ui/like-button.tsx
'use client'  // ← 파일 최상단, import 위에 선언

import { useState } from 'react'

export default function LikeButton({ likes }: { likes: number }) {
  const [count, setCount] = useState(likes)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

> `'use client'`는 Server/Client 모듈 그래프의 경계를 선언
> 선언 파일 내 모든 import와 하위 컴포넌트는 클라이언트 번들에 포함

### 동작 원리

**서버에서:**
- RSC Payload 생성 (렌더링 결과 + Client Component 플레이스홀더 + 참조)
- Client Component와 RSC Payload로 HTML 사전렌더링

**클라이언트 첫 방문:**
1. HTML → 빠른 비인터랙티브 미리보기
2. RSC Payload → Client/Server 컴포넌트 트리 재조정
3. JavaScript → Client Component 수화(hydration)

**이후 네비게이션:**
- RSC Payload 프리페치 및 캐시 → 즉각적인 네비게이션

### Server → Client 데이터 전달

```tsx
// Server에서 props로 전달 (직렬화 가능한 값만)
<LikeButton likes={post.likes} />
```

### Server Component를 Client Component 안에 배치

```tsx
// Client Component
'use client'
export default function Modal({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>  // Server Component를 children으로 받음
}

// Server Component에서 조합
import Modal from './ui/modal'
import Cart from './ui/cart'  // Server Component

export default function Page() {
  return (
    <Modal>
      <Cart />  {/* Server Component를 children으로 전달 */}
    </Modal>
  )
}
```

### Context Provider

```tsx
// app/theme-provider.tsx
'use client'
import { createContext } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

> 프로바이더를 트리 최대한 깊이 배치해 정적 부분 최적화

### 서버 전용 모듈 보호

```bash
npm install server-only
```

```ts
// lib/data.ts
import 'server-only'  // Client Component에서 임포트 시 빌드 에러

export async function getData() {
  const res = await fetch('https://api.example.com', {
    headers: { authorization: process.env.API_KEY },
  })
  return res.json()
}
```

### 서드파티 컴포넌트 래핑

```tsx
// app/carousel.tsx
'use client'
import { Carousel } from 'acme-carousel'
export default Carousel  // 클라이언트 전용 라이브러리를 Client Component로 래핑
```

---

## 6. Fetching Data

### Server Component에서 페치

```tsx
// fetch API 사용
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

// ORM/DB 직접 사용
import { db, posts } from '@/lib/db'

export default async function Page() {
  const allPosts = await db.select().from(posts)
  return <ul>{allPosts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
}
```

> DB 쿼리 로직은 클라이언트 번들에 포함되지 않아 안전

### 스트리밍 — loading.tsx

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div>Loading...</div>
}
```

### 스트리밍 — Suspense (세밀한 제어)

```tsx
import { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import BlogListSkeleton from '@/components/BlogListSkeleton'

export default function BlogPage() {
  return (
    <div>
      <header><h1>Blog</h1></header>
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList />
      </Suspense>
    </div>
  )
}
```

### 병렬 페치 (권장)

```tsx
export default async function Page({ params }) {
  const { username } = await params

  // 동시에 시작
  const artistData = getArtist(username)
  const albumsData = getAlbums(username)

  // 둘 다 완료될 때까지 대기
  const [artist, albums] = await Promise.all([artistData, albumsData])

  return (
    <>
      <h1>{artist.name}</h1>
      <Albums list={albums} />
    </>
  )
}
```

> `Promise.allSettled` — 하나가 실패해도 나머지 결과를 받으려는 경우

### 순차 페치 (의존성이 있는 경우)

```tsx
export default async function Page({ params }) {
  const { username } = await params
  const artist = await getArtist(username)  // 먼저 페치

  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Playlists artistID={artist.id} />  {/* artist.id에 의존 */}
      </Suspense>
    </>
  )
}
```

### React use API (Client Component)

```tsx
// Server Component: Promise를 await 없이 전달
import Posts from '@/app/ui/posts'
import { Suspense } from 'react'

export default function Page() {
  const posts = getPosts()  // await 안 함
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

```tsx
// Client Component: use()로 resolve
'use client'
import { use } from 'react'

export default function Posts({ posts }) {
  const allPosts = use(posts)  // Promise를 여기서 resolve
  return <ul>{allPosts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

### React.cache로 데이터 공유

```ts
// app/lib/user.ts
import { cache } from 'react'

export const getUser = cache(async () => {
  const res = await fetch('https://api.example.com/user')
  return res.json()
})
// 동일 요청 내에서 여러 번 호출해도 실제 fetch는 1번만 실행
```

### SWR / React Query (클라이언트)

```tsx
'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function BlogPage() {
  const { data, error, isLoading } = useSWR('https://api.vercel.app/blog', fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <ul>{data.map(post => <li key={post.id}>{post.title}</li>)}</ul>
}
```

> ⚠️ `React.cache`는 현재 요청 범위에서만 유효 — 요청 간 공유 불가

---

## 7. Mutating Data

### Server Function 생성

```ts
// app/lib/actions.ts
import { auth } from '@/lib/auth'

export async function createPost(formData: FormData) {
  'use server'  // 서버에서 실행됨을 선언

  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const title = formData.get('title')
  const content = formData.get('content')

  // DB 뮤테이션 + 캐시 재검증
}
```

> ⚠️ **보안 중요**: Server Function은 직접 POST 요청으로도 호출 가능
> **모든 Server Function에서 인증/인가를 반드시 검증할 것**

### Form에서 Server Action 사용

```tsx
import { createPost } from '@/app/actions'

export function Form() {
  return (
    <form action={createPost}>
      <input type="text" name="title" />
      <textarea name="content" />
      <button type="submit">Create</button>
    </form>
  )
}
```

> Progressive Enhancement: JavaScript 로드 전에도 폼 제출 동작

### 로딩 상태 — useActionState

```tsx
'use client'
import { useActionState } from 'react'
import { createPost } from '@/app/actions'

const initialState = { message: '' }

export function Form() {
  const [state, formAction, pending] = useActionState(createPost, initialState)

  return (
    <form action={formAction}>
      <input type="text" name="title" required />
      <textarea name="content" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>Create Post</button>
    </form>
  )
}
```

### 이벤트 핸들러에서 호출

```tsx
'use client'
import { incrementLike } from './actions'
import { useState } from 'react'

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)

  return (
    <button
      onClick={async () => {
        const updatedLikes = await incrementLike()
        setLikes(updatedLikes)
      }}
    >
      ❤️ {likes}
    </button>
  )
}
```

### 뮤테이션 후 캐시 업데이트

```ts
'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  // DB 뮤테이션
  revalidatePath('/posts')   // 경로 캐시 무효화
  redirect('/posts')          // 리디렉션
}
```

### 에러 처리 패턴

```ts
// Server Action — 에러를 반환값으로 처리
'use server'
export async function createPost(prevState: any, formData: FormData) {
  const res = await fetch('https://api.vercel.app/posts', {
    method: 'POST',
    body: JSON.stringify({ title: formData.get('title') }),
  })

  if (!res.ok) {
    return { message: 'Failed to create post' }  // throw 대신 return
  }
}
```

### 쿠키 관리

```ts
'use server'
import { cookies } from 'next/headers'

export async function exampleAction() {
  const cookieStore = await cookies()
  cookieStore.get('name')?.value    // 읽기
  cookieStore.set('name', 'value')  // 설정
  cookieStore.delete('name')        // 삭제
}
```

> 쿠키 설정/삭제 시 Next.js가 현재 페이지와 레이아웃을 서버에서 리렌더링

---

## 8. Caching

### 설정 활성화

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

### `use cache` 디렉티브

데이터 수준 캐싱:

```tsx
import { cacheLife } from 'next/cache'

export async function getUsers() {
  'use cache'
  cacheLife('hours')
  return db.query('SELECT * FROM users')
}
```

UI 수준 캐싱:

```tsx
import { cacheLife } from 'next/cache'

export default async function Page() {
  'use cache'
  cacheLife('hours')

  const users = await db.query('SELECT * FROM users')
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
```

### 캐시 유지 시간 프로필

| 프로필 | stale | revalidate | expire |
|--------|-------|------------|--------|
| `seconds` | 0 | 1s | 60s |
| `minutes` | 5m | 1m | 1h |
| `hours` | 5m | 1h | 1d |
| `days` | 5m | 1d | 1w |
| `weeks` | 5m | 1w | 30d |
| `max` | 5m | 30d | ~무기한 |

커스텀 설정:

```tsx
'use cache'
cacheLife({
  stale: 3600,    // 1시간 후 stale
  revalidate: 7200, // 2시간마다 재검증
  expire: 86400,  // 1일 후 만료
})
```

### 캐시하지 않는 데이터 스트리밍

```tsx
import { Suspense } from 'react'

async function LatestPosts() {
  // use cache 없음 → 매 요청마다 새로운 데이터
  const posts = await fetch('https://api.example.com/posts').then(r => r.json())
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}

export default function Page() {
  return (
    <>
      <h1>My Blog</h1>
      <Suspense fallback={<p>Loading posts...</p>}>
        <LatestPosts />
      </Suspense>
    </>
  )
}
```

### 런타임 API 처리

```tsx
import { cookies } from 'next/headers'
import { Suspense } from 'react'

async function UserGreeting() {
  const theme = (await cookies()).get('theme')?.value || 'light'
  return <p>Theme: {theme}</p>
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserGreeting />
    </Suspense>
  )
}
```

런타임 값을 캐시 함수의 인수로 전달:

```tsx
async function ProfileContent() {
  const session = (await cookies()).get('session')?.value
  return <CachedContent sessionId={session} />
}

async function CachedContent({ sessionId }: { sessionId: string }) {
  'use cache'
  // sessionId가 캐시 키의 일부가 됨
  const data = await fetchUserData(sessionId)
  return <div>{data}</div>
}
```

> ⚠️ 주의: 런타임 API(`cookies`, `headers`, `searchParams`)를 사용하는 컴포넌트는
> `<Suspense>`로 감싸거나 `use cache`로 캐시해야 함
> 그렇지 않으면 빌드/개발 시 `"Uncached data was accessed outside of <Suspense>"` 에러 발생

### Partial Prerendering (PPR) — 기본 동작

- **Static shell**: 정적 HTML + 캐시된 콘텐츠
- **Dynamic holes**: 요청 시점에 스트리밍

---

## 9. Revalidating

### 재검증 전략 비교

| 방법 | 위치 | 동작 | 사용 시점 |
|------|------|------|----------|
| `cacheLife` | `use cache` 내부 | 시간 기반 만료 설정 | 캐시 유효시간 지정 |
| `cacheTag` | `use cache` 내부 | 태그로 그룹화 | 온디맨드 무효화 준비 |
| `revalidateTag` | Server Action, Route Handler | stale-while-revalidate | 백그라운드 갱신 (약간의 지연 허용) |
| `updateTag` | Server Action 전용 | 즉시 만료 | 내 변경사항을 즉시 보기 |
| `revalidatePath` | Server Action, Route Handler | 전체 경로 재검증 | 태그를 모를 때 |

### 태그 기반 캐싱

```tsx
import { cacheTag } from 'next/cache'

export async function getProducts() {
  'use cache'
  cacheTag('products')  // 태그 부여
  return db.query('SELECT * FROM products')
}
```

### revalidateTag — 백그라운드 갱신

```ts
import { revalidateTag } from 'next/cache'

export async function updateProduct() {
  // DB 업데이트
  revalidateTag('products')  // 태그된 캐시 무효화 (stale-while-revalidate)
}
```

### updateTag — 즉시 만료 (내 변경사항 즉시 반영)

```ts
import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const post = await db.post.create({ data: { title: formData.get('title') } })

  updateTag('posts')  // 즉시 캐시 무효화
  redirect(`/posts/${post.id}`)  // 새 데이터로 이동
}
```

### revalidatePath — 경로 기반

```ts
import { revalidatePath } from 'next/cache'

export async function updateUser() {
  // DB 업데이트
  revalidatePath('/profile')  // /profile 경로 전체 재검증
}
```

> **권장**: 태그 기반 재검증 > 경로 기반 재검증 (더 정확하고 과도한 무효화 방지)

---

## 10. Error Handling

### 에러 분류

| 종류 | 예시 | 처리 방법 |
|------|------|----------|
| **Expected Error** | 폼 검증 실패, API 실패 | 반환값으로 처리 (`return { message: ... }`) |
| **Uncaught Exception** | 버그, 예상치 못한 오류 | Error Boundary (`error.tsx`) |

### Expected Error 처리

```ts
// Server Action — throw 대신 return
'use server'
export async function createPost(prevState: any, formData: FormData) {
  const res = await fetch('https://api.vercel.app/posts', { method: 'POST' })

  if (!res.ok) {
    return { message: 'Failed to create post' }  // 에러를 반환값으로
  }
}
```

```tsx
// Client Component — useActionState로 에러 표시
'use client'
import { useActionState } from 'react'
import { createPost } from '@/app/actions'

export function Form() {
  const [state, formAction, pending] = useActionState(createPost, { message: '' })

  return (
    <form action={formAction}>
      <input type="text" name="title" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>Submit</button>
    </form>
  )
}
```

### Server Component에서 Expected Error

```tsx
export default async function Page() {
  const res = await fetch('https://...')

  if (!res.ok) {
    return 'There was an error.'  // 에러 UI 반환
  }

  const data = await res.json()
  return <div>{data.title}</div>
}
```

### 404 처리

```tsx
import { notFound } from 'next/navigation'

export default async function Page({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()  // not-found.tsx 렌더링
  }

  return <div>{post.title}</div>
}
```

```tsx
// app/blog/[slug]/not-found.tsx
export default function NotFound() {
  return <div>404 - 페이지를 찾을 수 없습니다</div>
}
```

### Uncaught Exception — error.tsx

```tsx
// app/dashboard/error.tsx
'use client'  // Error Boundary는 반드시 Client Component

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)  // 에러 리포팅 서비스로 전송
  }, [error])

  return (
    <div>
      <h2>오류가 발생했습니다</h2>
      <button onClick={() => unstable_retry()}>다시 시도</button>
    </div>
  )
}
```

### 이벤트 핸들러 에러

```tsx
'use client'
import { useState } from 'react'

export function Button() {
  const [error, setError] = useState<Error | null>(null)

  const handleClick = () => {
    try {
      throw new Error('Something went wrong')
    } catch (err) {
      setError(err as Error)
    }
  }

  if (error) return <div>Error: {error.message}</div>

  return <button onClick={handleClick}>Click me</button>
}
```

> Error Boundary는 이벤트 핸들러 에러를 잡지 못함 → `useState`로 직접 처리

### Global Error

```tsx
// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html>  {/* 루트 레이아웃 대체 → html, body 필수 */}
      <body>
        <h2>예상치 못한 오류가 발생했습니다</h2>
        <button onClick={() => unstable_retry()}>다시 시도</button>
      </body>
    </html>
  )
}
```

---

## 11. CSS

### Tailwind CSS (권장)

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.mjs
export default {
  plugins: { '@tailwindcss/postcss': {} },
}
```

```css
/* app/globals.css */
@import 'tailwindcss';
```

```tsx
// app/layout.tsx
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// app/page.tsx
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Welcome!</h1>
    </main>
  )
}
```

### CSS Modules

```css
/* app/blog/blog.module.css */
.blog {
  padding: 24px;
}
```

```tsx
// app/blog/page.tsx
import styles from './blog.module.css'

export default function Page() {
  return <main className={styles.blog}></main>
}
```

### Global CSS

```tsx
// app/layout.tsx — app 디렉토리의 어느 레이아웃/페이지/컴포넌트에서도 임포트 가능
import './global.css'
```

### External Stylesheets

```tsx
// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.css'
```

### CSS 우선순위

- Import 순서가 CSS 적용 순서를 결정
- 프로덕션: 모든 CSS를 자동으로 연결 및 최소화
- ESLint의 `sort-imports` 자동 정렬 규칙 비활성화 권장

---

## 12. Image Optimization

### 기본 사용

```tsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="프로필 사진"
      width={500}
      height={500}
    />
  )
}
```

**자동 최적화:**
- 각 디바이스에 맞는 크기로 자동 조정 (WebP 포맷)
- Cumulative Layout Shift 방지
- 뷰포트 진입 시 지연 로딩 (native lazy loading)

### 정적 임포트 (치수 자동 감지)

```tsx
import Image from 'next/image'
import ProfileImage from './profile.png'

export default function Page() {
  return (
    <Image
      src={ProfileImage}
      alt="프로필 사진"
      // width, height, blurDataURL 자동 제공
      placeholder="blur"  // 선택적 블러 효과
    />
  )
}
```

### 원격 이미지

```tsx
// 반드시 width, height 명시
<Image
  src="https://s3.amazonaws.com/my-bucket/profile.png"
  alt="프로필"
  width={500}
  height={500}
/>
```

```ts
// next.config.ts — 보안을 위해 허용 도메인 명시
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/my-bucket/**',
      },
    ],
  },
}
```

---

## 13. Font Optimization

`next/font` 모듈: 폰트를 자동으로 자체 호스팅 → 외부 네트워크 요청 없음, Layout Shift 방지

### Google Fonts

```tsx
// app/layout.tsx
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

비가변 폰트 (weight 필수):

```tsx
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
```

### 로컬 폰트

```tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './my-font.woff2',
})

// 여러 파일 (다양한 굵기/스타일)
const roboto = localFont({
  src: [
    { path: './Roboto-Regular.woff2', weight: '400', style: 'normal' },
    { path: './Roboto-Bold.woff2', weight: '700', style: 'normal' },
    { path: './Roboto-Italic.woff2', weight: '400', style: 'italic' },
  ],
})
```

> 가변 폰트(variable fonts) 사용 권장 — 최상의 성능과 유연성

---

## 14. Metadata and OG Images

### 정적 메타데이터

```tsx
// app/blog/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Blog',
  description: '...',
}
```

### 동적 메타데이터

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetch(`https://api.example.com/blog/${slug}`).then(r => r.json())

  return {
    title: post.title,
    description: post.description,
  }
}
```

### 중복 요청 방지 (React cache)

```ts
// app/lib/data.ts
import { cache } from 'react'

export const getPost = cache(async (slug: string) => {
  return db.query.posts.findFirst({ where: eq(posts.slug, slug) })
})

// generateMetadata와 Page 컴포넌트에서 각각 호출해도 실제 DB 쿼리는 1번
```

### 파일 기반 메타데이터

```
app/
  favicon.ico          ← 파비콘
  opengraph-image.jpg  ← OG 이미지 (루트)
  blog/
    opengraph-image.jpg  ← OG 이미지 (블로그, 더 구체적이면 우선)
  robots.txt
  sitemap.xml
```

### 동적 OG 이미지 생성

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { getPost } from '@/app/lib/data'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {post.title}
    </div>
  )
}
```

> `ImageResponse`는 flexbox와 CSS 서브셋만 지원 (grid 미지원)
> [OG Playground](https://og-playground.vercel.app/)에서 테스트 가능

> ⚠️ 스트리밍 메타데이터는 봇/크롤러(Twitterbot, Bingbot 등)에는 비활성화됨

---

## 15. Route Handlers

App Router에서 Web Request/Response API를 사용하는 커스텀 요청 핸들러 (Pages Router의 API Routes 대응)

### 기본 구조

```ts
// app/api/route.ts
export async function GET(request: Request) {
  return Response.json({ hello: 'world' })
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ received: body })
}
```

지원 메서드: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`

### 캐싱 (GET만 가능)

```ts
// app/items/route.ts
export const dynamic = 'force-static'  // GET 요청 캐싱

export async function GET() {
  const data = await fetch('https://api.example.com/items')
  return Response.json(await data.json())
}
```

### 동적 Route Handler

```ts
// app/api/random-number/route.ts
export async function GET() {
  return Response.json({ value: Math.random() })  // 비결정적 → 캐시 불가
}
```

```ts
// app/api/user-agent/route.ts
import { headers } from 'next/headers'

export async function GET() {
  const headersList = await headers()
  return Response.json({ userAgent: headersList.get('user-agent') })
}
```

### use cache와 함께 사용

```ts
// app/api/products/route.ts
import { cacheLife } from 'next/cache'

export async function GET() {
  const products = await getProducts()
  return Response.json(products)
}

async function getProducts() {
  'use cache'
  cacheLife('hours')
  return await db.query('SELECT * FROM products')
}
```

> `use cache`는 Route Handler 본문에 직접 사용 불가 — 헬퍼 함수로 분리해야 함

### TypeScript 타입 헬퍼

```ts
// app/users/[id]/route.ts
import type { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, ctx: RouteContext<'/users/[id]'>) {
  const { id } = await ctx.params
  return Response.json({ id })
}
```

### 충돌 규칙

| Page | Route | 결과 |
|------|-------|------|
| `app/page.js` | `app/route.js` | ❌ 충돌 |
| `app/page.js` | `app/api/route.js` | ✅ 유효 |

---

## 16. Deploying

### 배포 옵션 비교

| 옵션 | 지원 기능 | 특징 |
|------|----------|------|
| Node.js 서버 | 전체 | 가장 범용적 |
| Docker 컨테이너 | 전체 | Kubernetes, 클라우드 배포 |
| Static Export | 제한적 | 서버 불필요 (SPA/정적 사이트) |
| 플랫폼 어댑터 | 플랫폼별 상이 | Vercel, Bun 등 |

### Node.js 서버

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

```bash
npm run build
npm run start
```

### Docker

- `output: "standalone"` — 최소화된 프로덕션 이미지
- `output: "export"` — 완전 정적 배포

### Static Export

HTML/CSS/JS 정적 파일로 빌드 → AWS S3, GitHub Pages, Nginx 등에 배포

> 서버가 필요한 Next.js 기능(SSR, Route Handlers 등) 사용 불가

### Verified Adapters

| 플랫폼 | 상태 |
|--------|------|
| Vercel | ✅ 공식 검증 |
| Bun | ✅ 공식 검증 |
| Cloudflare | 🔄 작업 중 |
| Netlify | 🔄 작업 중 |

---

## 17. Upgrading

### 최신 버전 업그레이드

```bash
# Next.js 16.1.0 이상
pnpm next upgrade

# 이전 버전
npx @next/codemod@canary upgrade latest
```

### 수동 업그레이드

```bash
pnpm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

### Canary 버전

```bash
pnpm add next@canary
```

**Canary에서 사용 가능한 기능:**
- `forbidden()` / `unauthorized()` 함수
- `forbidden.js` / `unauthorized.js` 파일 컨벤션
- `authInterrupts` 설정 옵션

### 버전별 업그레이드 가이드

- [v13 → v14](https://nextjs.org/docs/app/guides/upgrading/version-14)
- [v14 → v15](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [v15 → v16](https://nextjs.org/docs/app/guides/upgrading/version-16)

---

## 빠른 참조

### 파일 컨벤션 요약

```
app/
  layout.tsx          ← 공유 레이아웃
  page.tsx            ← 페이지
  loading.tsx         ← 로딩 UI (Suspense)
  error.tsx           ← 에러 UI (Error Boundary, 'use client')
  not-found.tsx       ← 404 UI
  global-error.tsx    ← 글로벌 에러 (html+body 포함)
  route.ts            ← API 엔드포인트
  opengraph-image.tsx ← 동적 OG 이미지
  favicon.ico         ← 파비콘
  sitemap.xml         ← 사이트맵
  robots.txt          ← 크롤러 설정
```

### 주요 훅/함수

| API | 분류 | 용도 |
|-----|------|------|
| `useRouter` | Client | 프로그래매틱 네비게이션 |
| `useSearchParams` | Client | URL 쿼리 파라미터 읽기 |
| `useLinkStatus` | Client | 링크 전환 상태 |
| `useActionState` | Client | Server Action 상태 관리 |
| `notFound()` | Server | 404 트리거 |
| `redirect()` | Server | 리디렉션 |
| `revalidatePath()` | Server | 경로 캐시 무효화 |
| `revalidateTag()` | Server | 태그 캐시 무효화 (배경) |
| `updateTag()` | Server Action | 태그 캐시 즉시 만료 |
| `headers()` | Server | 요청 헤더 읽기 |
| `cookies()` | Server | 쿠키 읽기/쓰기 |

### Next.js v15 주요 변경사항

- `fetch` 요청 **자동 캐싱 제거** → 명시적으로 `cache: 'force-cache'` 필요
- `next build` 시 linter 자동 실행 제거
- `params`와 `searchParams`가 **Promise** 타입으로 변경 → `await` 필요
