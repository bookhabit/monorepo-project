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
        운영 리포트
      </h1>
      <p style={{ fontSize: '14px', color: '#8B95A1' }}>
        은행 상품 운영 통합 리포트 및 성능 관제 대시보드
      </p>
    </main>
  );
}
