import { useState } from 'react';
import styled from '@emotion/styled';
import { X, Monitor, TrendingUp, PieChart as PieChartIcon, Sun, Moon, ArrowUpDown, Loader2, WifiOff, AlertCircle } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 90vh;
  background: #111827;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  padding: 20px 24px;
  background: #1f2937;
  border-bottom: 1px solid #374151;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled.button`
  padding: 8px;
  background: transparent;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #374151;
    color: #f9fafb;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1f2937;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }
`;

const Section = styled.div`
  margin-bottom: 48px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
  line-height: 1.6;
`;

const ScreenPreview = styled.div`
  background: linear-gradient(to bottom right, #0f172a, #1e293b);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #374151;
`;

const StateLabel = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' | 'loading' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.1)';
      case 'error': return 'rgba(239, 68, 68, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'loading': return 'rgba(59, 130, 246, 0.1)';
      default: return 'rgba(156, 163, 175, 0.1)';
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'loading': return '#3b82f6';
      default: return '#9ca3af';
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.2)';
      case 'error': return 'rgba(239, 68, 68, 0.2)';
      case 'warning': return 'rgba(245, 158, 11, 0.2)';
      case 'loading': return 'rgba(59, 130, 246, 0.2)';
      default: return 'rgba(156, 163, 175, 0.2)';
    }
  }};
`;

const DemoCard = styled.div<{ hover?: boolean }>`
  background: #1f2937;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #374151;
  transition: all 0.3s ease;
  margin-bottom: 16px;
  
  ${props => props.hover && `
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    border-color: #3b82f6;
  `}
`;

const DemoTable = styled.div`
  background: #1f2937;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #374151;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 8px;
  padding: 12px;
  background: #374151;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
`;

const TableRow = styled.div<{ hover?: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 8px;
  padding: 12px;
  border-bottom: 1px solid #374151;
  font-size: 14px;
  transition: background 0.2s ease;
  
  ${props => props.hover && `
    background: #374151;
  `}
`;

const TabDemo = styled.div`
  display: flex;
  gap: 8px;
  background: #374151;
  padding: 4px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Tab = styled.div<{ active?: boolean; hover?: boolean }>`
  flex: 1;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  
  ${props => props.active ? `
    background: #1f2937;
    color: #3b82f6;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  ` : `
    background: transparent;
    color: #9ca3af;
  `}
  
  ${props => props.hover && !props.active && `
    color: #f9fafb;
  `}
`;

const TooltipDemo = styled.div`
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 12px;
  font-size: 13px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: inline-block;
`;

const ChartDemo = styled.div`
  background: #1f2937;
  border-radius: 8px;
  padding: 20px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid #374151;
`;

const GridDemo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ThemeToggleDemo = styled.button<{ theme: 'light' | 'dark' }>`
  padding: 10px;
  background: ${props => props.theme === 'light' ? '#f9fafb' : '#1f2937'};
  border: 1px solid ${props => props.theme === 'light' ? '#e5e7eb' : '#374151'};
  border-radius: 8px;
  color: ${props => props.theme === 'light' ? '#111827' : '#f9fafb'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SortButton = styled.div<{ hover?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.2s ease;
  
  ${props => props.hover && `
    color: #f9fafb;
  `}
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  gap: 16px;
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 2px dashed #ef4444;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
`;

const HighlightBox = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

interface ScreensViewerProps {
  onClose: () => void;
}

export function ScreensViewer({ onClose }: ScreensViewerProps) {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <Monitor size={24} />
            사용자 시나리오별 화면 정의
          </Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <Content>
          {/* 1. 초기 로딩 상태 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Loader2 size={24} />
                1. 초기 데이터 로딩
              </SectionTitle>
              <SectionDescription>
                페이지 진입 시 자산 데이터를 fetch하는 동안 표시되는 로딩 상태
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="loading">
                <Loader2 size={14} />
                Loading
              </StateLabel>
              <LoadingSpinner>
                <Loader2 size={48} color="#3b82f6" />
                <div style={{ color: '#9ca3af', fontSize: '14px' }}>
                  자산 데이터 로딩 중...
                </div>
              </LoadingSpinner>
            </ScreenPreview>
          </Section>

          {/* 2. 카드 호버 효과 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                2. 카드 호버 인터랙션
              </SectionTitle>
              <SectionDescription>
                대시보드의 각 카드에 마우스 오버 시 약간 들어올리는 효과와 테두리 색상 변경
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Monitor size={14} />
                Hover Effect
              </StateLabel>
              <GridDemo>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>기본 상태</div>
                  <DemoCard>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>총 평가액</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#f9fafb' }}>34,300,000원</div>
                  </DemoCard>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>호버 상태</div>
                  <DemoCard hover>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>총 평가액</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#f9fafb' }}>34,300,000원</div>
                  </DemoCard>
                </div>
              </GridDemo>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ transform: translateY(-2px)<br />
                ✓ box-shadow 강화<br />
                ✓ border-color 변경 (#3b82f6)<br />
                ✓ transition: all 0.3s ease
              </div>
            </ScreenPreview>
          </Section>

          {/* 3. 테마 토글 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Sun size={24} />
                3. 다크/라이트 모드 전환
              </SectionTitle>
              <SectionDescription>
                우측 상단 테마 토글 버튼으로 시스템 테마 또는 수동 전환
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Sun size={14} />
                Theme Toggle
              </StateLabel>
              <GridDemo>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>다크 모드</div>
                  <div style={{ 
                    background: '#111827', 
                    padding: '20px', 
                    borderRadius: '8px',
                    border: '1px solid #374151'
                  }}>
                    <ThemeToggleDemo theme="dark">
                      <Sun size={20} />
                    </ThemeToggleDemo>
                    <div style={{ marginTop: '12px', fontSize: '13px', color: '#9ca3af' }}>
                      배경: #111827<br />
                      텍스트: #f9fafb
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>라이트 모드</div>
                  <div style={{ 
                    background: '#ffffff', 
                    padding: '20px', 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <ThemeToggleDemo theme="light">
                      <Moon size={20} />
                    </ThemeToggleDemo>
                    <div style={{ marginTop: '12px', fontSize: '13px', color: '#6b7280' }}>
                      배경: #ffffff<br />
                      텍스트: #111827
                    </div>
                  </div>
                </div>
              </GridDemo>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ Context API로 전역 테마 관리<br />
                ✓ Emotion ThemeProvider 활용<br />
                ✓ 시스템 테마 자동 감지 (prefers-color-scheme)<br />
                ✓ 모든 색상 0.3s ease transition
              </div>
            </ScreenPreview>
          </Section>

          {/* 4. 탭 호버 및 활성화 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                4. 기간별 탭 인터랙션
              </SectionTitle>
              <SectionDescription>
                1일/1주/1개월 탭 전환 시 활성 상태 표시 및 호버 효과
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <TrendingUp size={14} />
                Tab Interaction
              </StateLabel>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>활성 상태 (1일 선택)</div>
                <TabDemo>
                  <Tab active>1일</Tab>
                  <Tab>1주</Tab>
                  <Tab>1개월</Tab>
                </TabDemo>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>호버 상태 (1주에 마우스 오버)</div>
                <TabDemo>
                  <Tab active>1일</Tab>
                  <Tab hover>1주</Tab>
                  <Tab>1개월</Tab>
                </TabDemo>
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 활성 탭: 배경색 변경, 파란색 텍스트, 그림자<br />
                ✓ 호버: 텍스트 색상 밝게<br />
                ✓ React-Query 캐싱으로 탭 전환 시 즉시 표시
              </div>
            </ScreenPreview>
          </Section>

          {/* 5. 차트 툴팁 호버 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <PieChartIcon size={24} />
                5. 차트 호버 툴팁
              </SectionTitle>
              <SectionDescription>
                도넛 차트 및 라인 차트에 마우스 오버 시 상세 정보 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <PieChartIcon size={14} />
                Chart Tooltip
              </StateLabel>
              <GridDemo>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>도넛 차트 툴팁</div>
                  <ChartDemo>
                    <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                      <TooltipDemo>
                        <div style={{ fontWeight: 600, marginBottom: '4px', color: '#f9fafb' }}>AAPL</div>
                        <div style={{ color: '#9ca3af', fontSize: '12px' }}>8,750,000원</div>
                        <div style={{ color: '#3b82f6', fontWeight: 600 }}>25.5%</div>
                      </TooltipDemo>
                    </div>
                    <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                      차트 영역<br />
                      (호버 시 툴팁 표시)
                    </div>
                  </ChartDemo>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>라인 차트 툴팁</div>
                  <ChartDemo>
                    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                      <TooltipDemo>
                        <div style={{ fontWeight: 600, marginBottom: '4px', color: '#f9fafb' }}>3월 24일 14:30</div>
                        <div style={{ color: '#f9fafb', fontSize: '12px' }}>평가액: 34,500,000원</div>
                        <div style={{ color: '#22c55e', fontWeight: 600 }}>+4,500,000원</div>
                      </TooltipDemo>
                    </div>
                    <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                      차트 영역<br />
                      (호버 시 툴팁 표시)
                    </div>
                  </ChartDemo>
                </div>
              </GridDemo>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ Recharts의 Tooltip 컴포넌트 활용<br />
                ✓ 커스텀 스타일로 테마에 맞춰 디자인<br />
                ✓ 수익/손실에 따라 색상 변경
              </div>
            </ScreenPreview>
          </Section>

          {/* 6. 테이블 행 호버 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                6. 테이블 행 호버 효과
              </SectionTitle>
              <SectionDescription>
                보유 종목 테이블의 각 행에 마우스 오버 시 배경색 변경
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Monitor size={14} />
                Row Hover
              </StateLabel>
              <DemoTable>
                <TableHeader>
                  <div>종목명</div>
                  <div style={{ textAlign: 'right' }}>수량</div>
                  <div style={{ textAlign: 'right' }}>현재가</div>
                  <div style={{ textAlign: 'right' }}>평가금액</div>
                  <div style={{ textAlign: 'right' }}>평가손익</div>
                  <div style={{ textAlign: 'right' }}>수익률</div>
                </TableHeader>
                <TableRow>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f9fafb' }}>AAPL</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Apple Inc.</div>
                  </div>
                  <div style={{ textAlign: 'right', color: '#f9fafb' }}>50주</div>
                  <div style={{ textAlign: 'right', color: '#f9fafb' }}>175,000원</div>
                  <div style={{ textAlign: 'right', color: '#f9fafb' }}>8,750,000원</div>
                  <div style={{ textAlign: 'right', color: '#22c55e', fontWeight: 600 }}>+1,250,000원</div>
                  <div style={{ textAlign: 'right', color: '#22c55e', fontWeight: 600 }}>+16.67%</div>
                </TableRow>
                <TableRow hover>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f9fafb' }}>MSFT</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Microsoft Corp.</div>
                  </div>
                  <div style={{ textAlign: 'right', color: '#f9fafb' }}>30주</div>
                  <div style={{ textAlign: 'right', color: '#f9fafb' }}>320,000원</div>
                  <div style={{ textAlign: 'right', color: '#f9fafb' }}>9,600,000원</div>
                  <div style={{ textAlign: 'right', color: '#22c55e', fontWeight: 600 }}>+1,200,000원</div>
                  <div style={{ textAlign: 'right', color: '#22c55e', fontWeight: 600 }}>+14.29%</div>
                </TableRow>
                <TableRow>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f9fafb' }}>TSLA</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>Tesla Inc.</div>
                  </div>
                  <div style={{ textAlign: 'right', color: '#f9fafb' }}>20주</div>
                  <div style={{ textAlign: 'right', color: '#f9fafb' }}>210,000원</div>
                  <div style={{ textAlign: 'right', color: '#f9fafb' }}>4,200,000원</div>
                  <div style={{ textAlign: 'right', color: '#ef4444', fontWeight: 600 }}>-200,000원</div>
                  <div style={{ textAlign: 'right', color: '#ef4444', fontWeight: 600 }}>-4.55%</div>
                </TableRow>
              </DemoTable>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 호버 시 배경색 변경 (#374151)<br />
                ✓ transition: background 0.2s ease<br />
                ✓ 수익은 녹색, 손실은 빨간색으로 표시
              </div>
            </ScreenPreview>
          </Section>

          {/* 7. 정렬 버튼 호버 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <ArrowUpDown size={24} />
                7. 테이블 정렬 인터랙션
              </SectionTitle>
              <SectionDescription>
                컬럼 헤더 클릭으로 정렬, 호버 시 색상 변경으로 클릭 가능함을 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <ArrowUpDown size={14} />
                Sort Interaction
              </StateLabel>
              <div style={{ background: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>기본 상태 (정렬 안됨)</div>
                  <SortButton>
                    평가금액
                    <ArrowUpDown size={14} />
                  </SortButton>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>호버 상태</div>
                  <SortButton hover>
                    평가금액
                    <ArrowUpDown size={14} />
                  </SortButton>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>내림차순 정렬</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#f9fafb', cursor: 'pointer' }}>
                    평가금액
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 클릭 시 오름차순/내림차순 토글<br />
                ✓ 아이콘으로 현재 정렬 방향 표시<br />
                ✓ useMemo로 정렬 결과 캐싱
              </div>
            </ScreenPreview>
          </Section>

          {/* 8. 가상 스크롤 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                8. 고성능 가상 리스트
              </SectionTitle>
              <SectionDescription>
                @tanstack/react-virtual로 대량 데이터도 부드럽게 렌더링
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <TrendingUp size={14} />
                Virtual Scrolling
              </StateLabel>
              <HighlightBox>
                <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>
                  성능 최적화 기법
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  ✓ 화면에 보이는 행만 렌더링 (Windowing)<br />
                  ✓ 스크롤 시 동적으로 DOM 재사용<br />
                  ✓ 1000개 이상 데이터도 60fps 유지<br />
                  ✓ estimateSize: 60px, overscan: 5
                </div>
              </HighlightBox>
              <div style={{ background: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>
                  스크롤 영역 (height: 400px)
                </div>
                <div style={{ 
                  height: '200px', 
                  overflow: 'auto',
                  border: '1px solid #374151',
                  borderRadius: '4px',
                  padding: '8px',
                  background: '#111827'
                }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} style={{ 
                      padding: '8px', 
                      borderBottom: '1px solid #374151',
                      fontSize: '12px',
                      color: '#9ca3af'
                    }}>
                      Row {i} (가상 렌더링)
                    </div>
                  ))}
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 9. React-Query 캐싱 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                9. React-Query 데이터 캐싱
              </SectionTitle>
              <SectionDescription>
                기간별 탭 전환 시 캐시된 데이터 즉시 표시, staleTime/gcTime 설정
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <TrendingUp size={14} />
                Query Caching
              </StateLabel>
              <div style={{ background: '#1f2937', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb', marginBottom: '16px' }}>
                  캐싱 전략
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '12px' }}>
                  <div style={{ color: '#3b82f6', fontWeight: 600, marginBottom: '4px' }}>자산 데이터</div>
                  • queryKey: ['assets']<br />
                  • staleTime: 60000ms (1분)<br />
                  • gcTime: 300000ms (5분)<br />
                  • 1분간은 재요청 없이 캐시 사용
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                  <div style={{ color: '#8b5cf6', fontWeight: 600, marginBottom: '4px' }}>수익률 데이터</div>
                  • queryKey: ['performance', period]<br />
                  • staleTime: 30000ms (30초)<br />
                  • gcTime: 300000ms (5분)<br />
                  • 탭별로 별도 캐싱
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 탭 전환 시 즉시 표시 (캐시 히트)<br />
                ✓ 백그라운드에서 데이터 갱신<br />
                ✓ 네트워크 요청 최소화
              </div>
            </ScreenPreview>
          </Section>

          {/* 10. 빈 데이터 상태 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <AlertCircle size={24} />
                10. 빈 데이터 상태
              </SectionTitle>
              <SectionDescription>
                보유 종목이 없거나 데이터가 없는 경우 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="warning">
                <AlertCircle size={14} />
                Empty State
              </StateLabel>
              <div style={{ 
                background: '#1f2937', 
                padding: '48px', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f9fafb', marginBottom: '8px' }}>
                  보유 자산이 없습니다
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                  종목을 추가하여 포트폴리오를 시작하세요
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 11. 네트워크 에러 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <WifiOff size={24} />
                11. 네트워크 에러 상태
              </SectionTitle>
              <SectionDescription>
                API 요청 실패 시 에러 메시지 및 재시도 버튼 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="error">
                <WifiOff size={14} />
                Network Error
              </StateLabel>
              <ErrorBox>
                <WifiOff size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#ef4444', marginBottom: '8px' }}>
                  데이터를 불러올 수 없습니다
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '16px' }}>
                  네트워크 연결을 확인하고 다시 시도해주세요
                </div>
                <button style={{ 
                  padding: '10px 20px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  다시 시도
                </button>
              </ErrorBox>
            </ScreenPreview>
          </Section>

          {/* 12. 반응형 레이아웃 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                <Monitor size={24} />
                12. 반응형 그리드 레이아웃
              </SectionTitle>
              <SectionDescription>
                화면 크기에 따라 그리드 컬럼 수 자동 조정
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Monitor size={14} />
                Responsive Grid
              </StateLabel>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 600, color: '#f9fafb', marginBottom: '4px' }}>
                    데스크탑 (1200px+)
                  </div>
                  grid-template-columns: repeat(3, 1fr);
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 600, color: '#f9fafb', marginBottom: '4px' }}>
                    태블릿 (768px - 1200px)
                  </div>
                  grid-template-columns: repeat(2, 1fr);
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#f9fafb', marginBottom: '4px' }}>
                    모바일 (~768px)
                  </div>
                  grid-template-columns: 1fr;
                </div>
              </div>
              <div style={{ background: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px'
                }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ 
                      background: '#374151',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#9ca3af',
                      textAlign: 'center'
                    }}>
                      카드 {i}
                    </div>
                  ))}
                </div>
              </div>
            </ScreenPreview>
          </Section>

          {/* 13. 데이터 페칭 중 (캐시 표시) */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                13. 백그라운드 데이터 갱신
              </SectionTitle>
              <SectionDescription>
                staleTime 지난 후 재요청 시 캐시된 데이터 표시하면서 백그라운드 갱신
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="info">
                <Loader2 size={14} />
                Background Refetch
              </StateLabel>
              <div style={{ background: '#1f2937', padding: '20px', borderRadius: '8px', position: 'relative' }}>
                <div style={{ 
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#3b82f6',
                  padding: '4px 8px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '4px'
                }}>
                  <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />
                  갱신 중
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f9fafb', marginBottom: '8px' }}>
                  총 평가액
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#f9fafb' }}>
                  34,300,000원
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
                  캐시된 데이터 표시 중...
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 사용자는 캐시 데이터로 즉시 인터랙션<br />
                ✓ 백그라운드에서 최신 데이터 fetch<br />
                ✓ 갱신 완료 시 자동으로 UI 업데이트
              </div>
            </ScreenPreview>
          </Section>

          {/* 14. 수익/손실 색상 구분 */}
          <Section>
            <SectionHeader>
              <SectionTitle>
                14. 수익/손실 시각적 구분
              </SectionTitle>
              <SectionDescription>
                양수는 녹색, 음수는 빨간색으로 일관되게 표시
              </SectionDescription>
            </SectionHeader>
            <ScreenPreview>
              <StateLabel type="success">
                <TrendingUp size={14} />
                Color Coding
              </StateLabel>
              <GridDemo>
                <div style={{ background: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>수익 (양수)</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e', marginBottom: '4px' }}>
                    +3,600,000원
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#22c55e' }}>
                    +12.00%
                  </div>
                </div>
                <div style={{ background: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>손실 (음수)</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>
                    -470,000원
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#ef4444' }}>
                    -5.55%
                  </div>
                </div>
              </GridDemo>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
                ✓ 녹색(#22c55e): 수익, 상승<br />
                ✓ 빨간색(#ef4444): 손실, 하락<br />
                ✓ 모든 수치에 +/- 기호 명시
              </div>
            </ScreenPreview>
          </Section>
        </Content>
      </Container>
    </Overlay>
  );
}
