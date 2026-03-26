import { SignupFormContainer } from '@/features/auth/components/SignupFormContainer';

export default function SignupPage() {
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
      <SignupFormContainer />
    </main>
  );
}
