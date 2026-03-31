import { Link } from 'react-router';
import styled from '@emotion/styled';
import { ArrowLeft, Activity, Monitor } from 'lucide-react';
import { Toaster } from 'sonner';
import { OrderBook } from '../components/order-book';
import { OrderPanel } from '../components/order-panel';
import { AccountInfo } from '../components/account-info';

const Container = styled.div`
  min-height: 100vh;
  background: #0f172a;
  max-width: 428px;
  margin: 0 auto;
  position: relative;
`;

const StatusBar = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e293b;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding-top: 8px;
`;

const Header = styled.header`
  background: #1e293b;
  border-bottom: 1px solid #374151;
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
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.95);
  }
`;

const ScreensButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(59, 130, 246, 0.2);
  border: none;
  border-radius: 50%;
  color: #3b82f6;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  
  &:active {
    transform: scale(0.95);
  }
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #f9fafb;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MainGrid = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export function OrderBookPage() {
  return (
    <Container>
      <StatusBar>9:41</StatusBar>
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <BackButton to="/">
              <ArrowLeft size={20} />
            </BackButton>
            <HeaderTitle>
              <Activity size={20} />
              호가창
            </HeaderTitle>
          </HeaderLeft>
          <ScreensButton to="/orderbook/screens">
            <Monitor size={20} />
          </ScreensButton>
        </HeaderContent>
      </Header>
      <MainGrid>
        <OrderBook />
        <RightPanel>
          <AccountInfo />
          <OrderPanel />
        </RightPanel>
      </MainGrid>
      <Toaster position="top-center" />
    </Container>
  );
}