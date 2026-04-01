import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        backgroundColor: '#f9fafb',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: 48, margin: '0 0 16px' }}>⚽</p>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
        페이지를 찾을 수 없습니다
      </h1>
      <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 32px', lineHeight: '21px' }}>
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/dashboard"
        style={{
          display: 'inline-block',
          padding: '10px 24px',
          backgroundColor: '#111827',
          color: '#ffffff',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
