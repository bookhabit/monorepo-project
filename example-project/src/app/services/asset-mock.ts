export interface AssetItem {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  profit: number;
  profitRate: number;
  weight: number;
}

export interface PerformanceData {
  date: string;
  value: number;
  profit: number;
}

export interface AssetSummary {
  totalValue: number;
  totalProfit: number;
  totalProfitRate: number;
  cash: number;
  stockValue: number;
}

const mockAssets: AssetItem[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 50,
    avgPrice: 150000,
    currentPrice: 175000,
    value: 8750000,
    profit: 1250000,
    profitRate: 16.67,
    weight: 25.5,
  },
  {
    id: '2',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    quantity: 30,
    avgPrice: 280000,
    currentPrice: 320000,
    value: 9600000,
    profit: 1200000,
    profitRate: 14.29,
    weight: 28.0,
  },
  {
    id: '3',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 40,
    avgPrice: 130000,
    currentPrice: 145000,
    value: 5800000,
    profit: 600000,
    profitRate: 11.54,
    weight: 16.9,
  },
  {
    id: '4',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    quantity: 35,
    avgPrice: 140000,
    currentPrice: 155000,
    value: 5425000,
    profit: 525000,
    profitRate: 10.71,
    weight: 15.8,
  },
  {
    id: '5',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    quantity: 20,
    avgPrice: 220000,
    currentPrice: 210000,
    value: 4200000,
    profit: -200000,
    profitRate: -4.55,
    weight: 12.2,
  },
  {
    id: '6',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    quantity: 15,
    avgPrice: 180000,
    currentPrice: 195000,
    value: 2925000,
    profit: 225000,
    profitRate: 8.33,
    weight: 8.5,
  },
  {
    id: '7',
    symbol: 'META',
    name: 'Meta Platforms',
    quantity: 25,
    avgPrice: 160000,
    currentPrice: 165000,
    value: 4125000,
    profit: 125000,
    profitRate: 3.13,
    weight: 12.0,
  },
  {
    id: '8',
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    quantity: 18,
    avgPrice: 250000,
    currentPrice: 235000,
    value: 4230000,
    profit: -270000,
    profitRate: -6.00,
    weight: 12.3,
  },
];

// 1일 수익률 데이터 생성
function generateDailyData(): PerformanceData[] {
  const data: PerformanceData[] = [];
  const now = new Date();
  let value = 30000000;

  for (let i = 24; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 60 * 60 * 1000);
    const change = (Math.random() - 0.5) * 200000;
    value += change;
    
    data.push({
      date: date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      value: Math.floor(value),
      profit: Math.floor(value - 30000000),
    });
  }

  return data;
}

// 1주 수익률 데이터 생성
function generateWeeklyData(): PerformanceData[] {
  const data: PerformanceData[] = [];
  const now = new Date();
  let value = 28000000;

  for (let i = 7; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const change = (Math.random() - 0.4) * 500000;
    value += change;
    
    data.push({
      date: date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      value: Math.floor(value),
      profit: Math.floor(value - 28000000),
    });
  }

  return data;
}

// 1개월 수익률 데이터 생성
function generateMonthlyData(): PerformanceData[] {
  const data: PerformanceData[] = [];
  const now = new Date();
  let value = 25000000;

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const change = (Math.random() - 0.3) * 300000;
    value += change;
    
    data.push({
      date: date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      value: Math.floor(value),
      profit: Math.floor(value - 25000000),
    });
  }

  return data;
}

export async function fetchAssets(): Promise<AssetItem[]> {
  // API 호출 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockAssets;
}

export async function fetchPerformanceData(period: '1D' | '1W' | '1M'): Promise<PerformanceData[]> {
  // API 호출 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  switch (period) {
    case '1D':
      return generateDailyData();
    case '1W':
      return generateWeeklyData();
    case '1M':
      return generateMonthlyData();
    default:
      return generateDailyData();
  }
}

export function calculateSummary(assets: AssetItem[]): AssetSummary {
  const stockValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalProfit = assets.reduce((sum, asset) => sum + asset.profit, 0);
  const totalCost = stockValue - totalProfit;
  const totalProfitRate = (totalProfit / totalCost) * 100;
  const cash = 5000000; // 보유 현금

  return {
    totalValue: stockValue + cash,
    totalProfit,
    totalProfitRate,
    cash,
    stockValue,
  };
}
