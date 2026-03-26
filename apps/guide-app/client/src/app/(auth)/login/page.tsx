import { LoginFormContainer } from '@/features/auth/components/LoginFormContainer';

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
      }}
    >
      <LoginFormContainer />
    </main>
  );
}
