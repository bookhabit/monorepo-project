import { useTheme as useEmotionTheme } from '@emotion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AssetItem } from '../../services/asset-mock';

const COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#22c55e', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#14b8a6', // teal
];

interface AssetAllocationProps {
  assets: AssetItem[];
}

export function AssetAllocation({ assets }: AssetAllocationProps) {
  const theme = useEmotionTheme();

  const chartData = assets.map((asset) => ({
    name: asset.symbol,
    value: asset.value,
    weight: asset.weight,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: theme.color.backgroundSecondary,
            border: `1px solid ${theme.color.border}`,
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.sm,
            fontSize: '13px',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>
            {payload[0].name}
          </div>
          <div style={{ color: theme.color.textMuted }}>
            {payload[0].value.toLocaleString()}원
          </div>
          <div style={{ color: theme.color.primary, fontWeight: 600 }}>
            {payload[0].payload.weight.toFixed(1)}%
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value, entry: any) => (
            <span style={{ fontSize: '12px', color: theme.color.text }}>
              {value} ({entry.payload.weight.toFixed(1)}%)
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
