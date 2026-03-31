import { Link } from 'react-router';
import styled from '@emotion/styled';
import { ArrowLeft, Wallet, TrendingUp, DollarSign, Monitor } from 'lucide-react';
import { useAssetData } from '../hooks/use-asset-data';
import { calculateSummary } from '../services/asset-mock';
import { AssetAllocation } from '../components/asset/AssetAllocation';
import { PerformanceChart } from '../components/asset/PerformanceChart';
import { AssetTable } from '../components/asset/AssetTable';
import { ThemeToggle } from '../components/asset/ThemeToggle';
import { ThemeProvider } from '../contexts/ThemeContext';

const Container = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.color.background};
  color: ${(props) => props.theme.color.text};
  max-width: 428px;
  margin: 0 auto;
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const StatusBar = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color.backgroundSecondary};
  color: ${(props) => props.theme.color.text};
  font-size: 12px;
  font-weight: 600;
  padding-top: 8px;
`;

const Header = styled.div`
  background: ${(props) => props.theme.color.backgroundSecondary};
  border-bottom: 1px solid ${(props) => props.theme.color.border};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  padding: 12px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${(props) => props.theme.color.backgroundTertiary};
  border: none;
  border-radius: 50%;
  color: ${(props) => props.theme.color.text};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.color.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${(props) => props.theme.color.backgroundTertiary};
  border: none;
  border-radius: 50%;
  color: ${(props) => props.theme.color.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const SummarySection = styled.div`
  padding: 20px 16px;
  background: ${(props) => props.theme.color.backgroundSecondary};
  border-bottom: 1px solid ${(props) => props.theme.color.border};
`;

const TotalValue = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const TotalLabel = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.color.textMuted};
  margin-bottom: 8px;
`;

const TotalAmount = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: ${(props) => props.theme.color.text};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const MetricCard = styled.div`
  text-align: center;
  padding: 12px;
  background: ${(props) => props.theme.color.background};
  border-radius: 12px;
`;

const MetricIcon = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  background: ${props => props.color};
  color: white;
`;

const MetricLabel = styled.div`
  font-size: 11px;
  color: ${(props) => props.theme.color.textMuted};
  margin-bottom: 4px;
`;

const MetricValue = styled.div<{ color?: string }>`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.color || props.theme.color.text};
`;

const ContentContainer = styled.div`
  padding: 16px;
  padding-bottom: 80px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.color.text};
  margin: 0 0 12px 0;
`;

function AssetDashboardContent() {
  const { data: assets } = useAssetData();
  const summary = calculateSummary(assets || []);

  // Provide default values to prevent undefined errors
  const totalValue = summary?.totalValue ?? 0;
  const totalInvestment = summary?.totalInvestment ?? 0;
  const totalProfit = summary?.totalProfit ?? 0;
  const totalReturn = summary?.totalReturn ?? 0;

  return (
    <Container>
      <StatusBar>9:41</StatusBar>
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <BackButton to="/">
              <ArrowLeft size={20} />
            </BackButton>
            <Title>
              <Wallet size={20} />
              자산
            </Title>
          </HeaderLeft>
          <HeaderActions>
            <ThemeToggle />
            <IconButton as={Link} to="/asset-dashboard/screens">
              <Monitor size={20} />
            </IconButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <SummarySection>
        <TotalValue>
          <TotalLabel>총 자산</TotalLabel>
          <TotalAmount>₩{totalValue.toLocaleString()}</TotalAmount>
        </TotalValue>
        <MetricsGrid>
          <MetricCard>
            <MetricIcon color="linear-gradient(135deg, #3b82f6, #2563eb)">
              <Wallet size={16} />
            </MetricIcon>
            <MetricLabel>투자금</MetricLabel>
            <MetricValue>₩{totalInvestment.toLocaleString()}</MetricValue>
          </MetricCard>
          <MetricCard>
            <MetricIcon color="linear-gradient(135deg, #10b981, #059669)">
              <TrendingUp size={16} />
            </MetricIcon>
            <MetricLabel>수익금</MetricLabel>
            <MetricValue color={totalProfit >= 0 ? '#10b981' : '#ef4444'}>
              ₩{totalProfit.toLocaleString()}
            </MetricValue>
          </MetricCard>
          <MetricCard>
            <MetricIcon color="linear-gradient(135deg, #f59e0b, #d97706)">
              <DollarSign size={16} />
            </MetricIcon>
            <MetricLabel>수익률</MetricLabel>
            <MetricValue color={totalReturn >= 0 ? '#10b981' : '#ef4444'}>
              {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
            </MetricValue>
          </MetricCard>
        </MetricsGrid>
      </SummarySection>

      <ContentContainer>
        <Section>
          <SectionTitle>자산 배분</SectionTitle>
          <AssetAllocation assets={assets || []} />
        </Section>

        <Section>
          <SectionTitle>수익률 추이</SectionTitle>
          <PerformanceChart />
        </Section>

        <Section>
          <SectionTitle>보유 자산</SectionTitle>
          <AssetTable assets={assets || []} />
        </Section>
      </ContentContainer>
    </Container>
  );
}

export function AssetDashboardPage() {
  return (
    <ThemeProvider>
      <AssetDashboardContent />
    </ThemeProvider>
  );
}