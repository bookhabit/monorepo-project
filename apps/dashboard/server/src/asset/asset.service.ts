import { Injectable } from '@nestjs/common';

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

export interface AssetSummary {
  totalValue: number;
  totalProfit: number;
  totalProfitRate: number;
  cash: number;
  stockValue: number;
}

const ASSETS: AssetItem[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', quantity: 50, avgPrice: 150000, currentPrice: 175000, value: 8750000, profit: 1250000, profitRate: 16.67, weight: 25.5 },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 30, avgPrice: 280000, currentPrice: 320000, value: 9600000, profit: 1200000, profitRate: 14.29, weight: 28.0 },
  { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 40, avgPrice: 130000, currentPrice: 145000, value: 5800000, profit: 600000, profitRate: 11.54, weight: 16.9 },
  { id: '4', symbol: 'AMZN', name: 'Amazon.com Inc.', quantity: 35, avgPrice: 140000, currentPrice: 155000, value: 5425000, profit: 525000, profitRate: 10.71, weight: 15.8 },
  { id: '5', symbol: 'TSLA', name: 'Tesla Inc.', quantity: 20, avgPrice: 220000, currentPrice: 210000, value: 4200000, profit: -200000, profitRate: -4.55, weight: 12.2 },
  { id: '6', symbol: 'NVDA', name: 'NVIDIA Corp.', quantity: 15, avgPrice: 180000, currentPrice: 195000, value: 2925000, profit: 225000, profitRate: 8.33, weight: 8.5 },
  { id: '7', symbol: 'META', name: 'Meta Platforms', quantity: 25, avgPrice: 160000, currentPrice: 165000, value: 4125000, profit: 125000, profitRate: 3.13, weight: 12.0 },
  { id: '8', symbol: 'NFLX', name: 'Netflix Inc.', quantity: 18, avgPrice: 250000, currentPrice: 235000, value: 4230000, profit: -270000, profitRate: -6.0, weight: 12.3 },
];

const CASH = 5_000_000;

@Injectable()
export class AssetService {
  findAll(): AssetItem[] {
    return ASSETS;
  }

  getSummary(): AssetSummary {
    const stockValue = ASSETS.reduce((sum, a) => sum + a.value, 0);
    const totalProfit = ASSETS.reduce((sum, a) => sum + a.profit, 0);
    const totalCost = stockValue - totalProfit;
    const totalProfitRate = (totalProfit / totalCost) * 100;

    return {
      totalValue: stockValue + CASH,
      totalProfit,
      totalProfitRate,
      cash: CASH,
      stockValue,
    };
  }
}
