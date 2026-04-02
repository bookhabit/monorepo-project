import Page from './app/Page';
import { ToastProvider } from '@mono/ui';

export default function App() {
  return (
    <ToastProvider>
      <Page />
    </ToastProvider>
  );
}
