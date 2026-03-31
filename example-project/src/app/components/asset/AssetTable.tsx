import { useState, useMemo, useRef } from 'react';
import { useTheme as useEmotionTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { AssetItem } from '../../services/asset-mock';

const TableContainer = styled.div`
  width: 100%;
  font-size: 14px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.theme.color.backgroundTertiary};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-weight: 600;
  color: ${(props) => props.theme.color.textSecondary};
  font-size: 12px;
  text-transform: uppercase;
`;

const HeaderCell = styled.div<{ clickable?: boolean; align?: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  transition: color 0.2s ease;
  justify-content: ${(props) => props.align === 'right' ? 'flex-end' : 'flex-start'};

  &:hover {
    color: ${(props) => (props.clickable ? props.theme.color.text : 'inherit')};
  }
`;

const VirtualContainer = styled.div`
  height: 400px;
  overflow: auto;
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm};
  border-bottom: 1px solid ${(props) => props.theme.color.border};
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.color.backgroundTertiary};
  }
`;

const CellSymbol = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.color.text};
`;

const CellName = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.color.textMuted};
  margin-top: 2px;
`;

const CellValue = styled.div<{ positive?: boolean; negative?: boolean }>`
  color: ${(props) =>
    props.positive
      ? props.theme.color.success
      : props.negative
      ? props.theme.color.error
      : props.theme.color.text};
  font-weight: ${(props) => (props.positive || props.negative ? 600 : 400)};
  text-align: right;
`;

type SortField = 'symbol' | 'value' | 'profit' | 'profitRate';
type SortDirection = 'asc' | 'desc';

interface AssetTableProps {
  assets: AssetItem[];
}

export function AssetTable({ assets }: AssetTableProps) {
  const theme = useEmotionTheme();
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const parentRef = useRef<HTMLDivElement>(null);

  const sortedAssets = useMemo(() => {
    const sorted = [...assets].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [assets, sortField, sortDirection]);

  const virtualizer = useVirtualizer({
    count: sortedAssets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown size={14} />;
    }
    return sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <TableContainer>
      <TableHeader>
        <HeaderCell clickable onClick={() => handleSort('symbol')}>
          종목명
          <SortIcon field="symbol" />
        </HeaderCell>
        <HeaderCell align="right">수량</HeaderCell>
        <HeaderCell align="right">현재가</HeaderCell>
        <HeaderCell clickable align="right" onClick={() => handleSort('value')}>
          평가금액
          <SortIcon field="value" />
        </HeaderCell>
        <HeaderCell clickable align="right" onClick={() => handleSort('profit')}>
          평가손익
          <SortIcon field="profit" />
        </HeaderCell>
        <HeaderCell clickable align="right" onClick={() => handleSort('profitRate')}>
          수익률
          <SortIcon field="profitRate" />
        </HeaderCell>
      </TableHeader>

      <VirtualContainer ref={parentRef}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const asset = sortedAssets[virtualItem.index];
            const isPositive = asset.profit >= 0;

            return (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <TableRow>
                  <div>
                    <CellSymbol>{asset.symbol}</CellSymbol>
                    <CellName>{asset.name}</CellName>
                  </div>
                  <CellValue>{asset.quantity.toLocaleString()}주</CellValue>
                  <CellValue>{asset.currentPrice.toLocaleString()}원</CellValue>
                  <CellValue>{asset.value.toLocaleString()}원</CellValue>
                  <CellValue positive={isPositive} negative={!isPositive}>
                    {isPositive ? '+' : ''}
                    {asset.profit.toLocaleString()}원
                  </CellValue>
                  <CellValue positive={isPositive} negative={!isPositive}>
                    {isPositive ? '+' : ''}
                    {asset.profitRate.toFixed(2)}%
                  </CellValue>
                </TableRow>
              </div>
            );
          })}
        </div>
      </VirtualContainer>
    </TableContainer>
  );
}
