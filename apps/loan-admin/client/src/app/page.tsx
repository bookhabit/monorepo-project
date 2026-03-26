export default function HomePage() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
        backgroundColor: '#F2F4F6',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#191F28', marginBottom: '8px' }}>
        대출 심사 대시보드
      </h1>
      <p style={{ fontSize: '14px', color: '#8B95A1' }}>대규모 대출 심사 승인 Admin 대시보드</p>
    </main>
  );
}
