import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { OrderBookPage } from './pages/OrderBookPage';
import { AssetDashboardPage } from './pages/AssetDashboardPage';
import { AccountOpeningPage } from './pages/AccountOpeningPage';
import { NotificationCenterPage } from './pages/NotificationCenterPage';
import { LoanApprovalPage } from './pages/LoanApprovalPage';
import { FDSReportPage } from './pages/FDSReportPage';
import { CSConsolePage } from './pages/CSConsolePage';
import { PerformanceDashboardPage } from './pages/PerformanceDashboardPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { OrderBookScreens } from './pages/screens/OrderBookScreens';
import { AssetDashboardScreens } from './pages/screens/AssetDashboardScreens';
import { AccountOpeningScreens } from './pages/screens/AccountOpeningScreens';
import { NotificationCenterScreens } from './pages/screens/NotificationCenterScreens';
import { LoanApprovalScreens } from './pages/screens/LoanApprovalScreens';
import { FDSReportScreens } from './pages/screens/FDSReportScreens';
import { CSConsoleScreens } from './pages/screens/CSConsoleScreens';
import { PerformanceDashboardScreens } from './pages/screens/PerformanceDashboardScreens';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/orderbook',
    element: <OrderBookPage />,
  },
  {
    path: '/orderbook/screens',
    element: <OrderBookScreens />,
  },
  {
    path: '/asset-dashboard',
    element: <AssetDashboardPage />,
  },
  {
    path: '/asset-dashboard/screens',
    element: <AssetDashboardScreens />,
  },
  {
    path: '/account-opening',
    element: <AccountOpeningPage />,
  },
  {
    path: '/account-opening/screens',
    element: <AccountOpeningScreens />,
  },
  {
    path: '/notification-center',
    element: <NotificationCenterPage />,
  },
  {
    path: '/notification-center/screens',
    element: <NotificationCenterScreens />,
  },
  {
    path: '/loan-approval',
    element: <LoanApprovalPage />,
  },
  {
    path: '/loan-approval/screens',
    element: <LoanApprovalScreens />,
  },
  {
    path: '/fds-report',
    element: <FDSReportPage />,
  },
  {
    path: '/fds-report/screens',
    element: <FDSReportScreens />,
  },
  {
    path: '/cs-console',
    element: <CSConsolePage />,
  },
  {
    path: '/cs-console/screens',
    element: <CSConsoleScreens />,
  },
  {
    path: '/performance-dashboard',
    element: <PerformanceDashboardPage />,
  },
  {
    path: '/performance-dashboard/screens',
    element: <PerformanceDashboardScreens />,
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },
]);