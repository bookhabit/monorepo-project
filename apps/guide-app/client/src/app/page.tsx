import { redirect } from 'next/navigation';

// 루트 접근 시 대시보드로 리다이렉트 (Middleware가 인증 체크)
export default function RootPage() {
  redirect('/dashboard');
}
