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
        고객 상담 콘솔
      </h1>
      <p style={{ fontSize: '14px', color: '#8B95A1' }}>고객 상담 통합 콘솔 시스템</p>
    </main>
  );
}
