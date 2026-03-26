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
        FDS 리포트
      </h1>
      <p style={{ fontSize: '14px', color: '#8B95A1' }}>실시간 이상 거래 탐지 리포트 시스템</p>
    </main>
  );
}
