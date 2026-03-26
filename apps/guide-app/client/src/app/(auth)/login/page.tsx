import { LoginFormContainer } from '@/features/auth/components/LoginFormContainer';

export default function LoginPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <LoginFormContainer />
    </main>
  );
}
