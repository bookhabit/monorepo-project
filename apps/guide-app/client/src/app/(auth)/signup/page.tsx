import { SignupFormContainer } from '@/features/auth/components/SignupFormContainer';

export default function SignupPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <SignupFormContainer />
    </main>
  );
}
