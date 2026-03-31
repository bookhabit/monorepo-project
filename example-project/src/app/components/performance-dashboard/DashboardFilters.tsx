import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Calendar, Filter, Download, FileText } from 'lucide-react';
import { DashboardFilters as Filters, TimeRange } from '../../types/performance-dashboard';
import { useProducts } from '../../hooks/use-performance-dashboard';
import { exportToCSV, exportToExcel } from '../../services/performance-dashboard-api';
import { toast } from 'sonner';
import { format } from 'date-fns';

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    border: none;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
  ` : `
    background: white;
    color: #64748b;
    border: 1px solid #e2e8f0;

    &:hover {
      border-color: #cbd5e1;
      color: #475569;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ValidationError = styled.div`
  color: #dc2626;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 6px;
`;

interface DashboardFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function DashboardFilters({ filters, onFiltersChange }: DashboardFiltersProps) {
  const { data: products } = useProducts();

  const handleTimeRangeChange = (timeRange: TimeRange) => {
    onFiltersChange({ ...filters, timeRange, startDate: undefined, endDate: undefined });
  };

  const handleStartDateChange = (startDate: string) => {
    onFiltersChange({ ...filters, startDate });
  };

  const handleEndDateChange = (endDate: string) => {
    onFiltersChange({ ...filters, endDate });
  };

  const handleProductChange = (productId: string) => {
    onFiltersChange({ ...filters, productId: productId || undefined });
  };

  const handleSegmentChange = (segment: string) => {
    onFiltersChange({ ...filters, segment: segment as Filters['segment'] });
  };

  const handleExportCSV = async () => {
    try {
      toast.loading('CSV 파일을 생성하는 중...', { id: 'csv-export' });
      const blob = await exportToCSV(filters);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('CSV 파일이 다운로드되었습니다.', { id: 'csv-export' });
    } catch (error) {
      toast.error('CSV 내보내기에 실패했습니다.', { id: 'csv-export' });
    }
  };

  const handleExportExcel = async () => {
    try {
      toast.loading('Excel 파일을 생성하는 중...', { id: 'excel-export' });
      const blob = await exportToExcel(filters);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Excel 파일이 다운로드되었습니다.', { id: 'excel-export' });
    } catch (error) {
      toast.error('Excel 내보내기에 실패했습니다.', { id: 'excel-export' });
    }
  };

  // Validate date range
  const isValidDateRange = () => {
    if (filters.startDate && filters.endDate) {
      return new Date(filters.startDate) <= new Date(filters.endDate);
    }
    return true;
  };

  const validationError = !isValidDateRange();

  return (
    <Container>
      <FilterGroup>
        <Label>기간 단위</Label>
        <Select
          value={filters.timeRange}
          onChange={(e) => handleTimeRangeChange(e.target.value as TimeRange)}
        >
          <option value="daily">일별</option>
          <option value="weekly">주별</option>
          <option value="monthly">월별</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label>시작일</Label>
        <Input
          type="date"
          value={filters.startDate || ''}
          onChange={(e) => handleStartDateChange(e.target.value)}
          max={filters.endDate || format(new Date(), 'yyyy-MM-dd')}
        />
      </FilterGroup>

      <FilterGroup>
        <Label>종료일</Label>
        <Input
          type="date"
          value={filters.endDate || format(new Date(), 'yyyy-MM-dd')}
          onChange={(e) => handleEndDateChange(e.target.value)}
          min={filters.startDate}
          max={format(new Date(), 'yyyy-MM-dd')}
        />
      </FilterGroup>

      <FilterGroup>
        <Label>상품</Label>
        <Select
          value={filters.productId || ''}
          onChange={(e) => handleProductChange(e.target.value)}
        >
          <option value="">전체 상품</option>
          {products?.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label>고객 세그먼트</Label>
        <Select
          value={filters.segment || 'all'}
          onChange={(e) => handleSegmentChange(e.target.value)}
        >
          <option value="all">전체</option>
          <option value="vip">VIP</option>
          <option value="general">일반</option>
        </Select>
      </FilterGroup>

      <Spacer />

      <ButtonGroup>
        <Button variant="secondary" onClick={handleExportCSV}>
          <FileText size={16} />
          CSV
        </Button>
        <Button variant="secondary" onClick={handleExportExcel}>
          <Download size={16} />
          Excel
        </Button>
      </ButtonGroup>

      {validationError && (
        <ValidationError style={{ width: '100%' }}>
          종료일이 시작일보다 빠를 수 없습니다.
        </ValidationError>
      )}
    </Container>
  );
}
