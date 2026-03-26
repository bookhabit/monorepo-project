import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/signup'];

/**
 * Next.js Middleware — 프로텍트 라우트 진입점.
 *
 * httpOnly RT 쿠키(guide_app_rt) 유무로 인증 상태를 판단한다.
 * - RT 쿠키 없음 → 비인증 → 보호 경로 접근 시 /login 리다이렉트
 * - RT 쿠키 있음 → 인증됨 → /login, /signup 접근 시 /dashboard 리다이렉트
 *
 * httpOnly 쿠키는 브라우저 JS에서 접근 불가지만,
 * Edge Runtime(Middleware)에서는 request.cookies로 읽을 수 있다.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  // httpOnly RT 쿠키로 인증 상태 판단
  const hasRefreshToken = request.cookies.has('guide_app_rt');

  if (isPublicPath) {
    if (hasRefreshToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!hasRefreshToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
