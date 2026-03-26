/**
 * Protected Layout — 이 layout 아래의 모든 페이지는 인증 필요.
 * 실제 인증 체크는 middleware.ts에서 처리.
 * 이 layout은 공통 UI(헤더, 사이드바 등) 조립 전용.
 */
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
