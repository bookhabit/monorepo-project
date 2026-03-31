import { useSearchParams } from 'react-router';
import styled from '@emotion/styled';
import { Search, Filter, X } from 'lucide-react';
import { FilterParams, LoanStatus } from '../../types/loan';

const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }

  input {
    padding-left: 40px;
  }
`;

const ClearButton = styled.button`
  padding: 10px 16px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #e5e7eb;
  }
`;

const ActiveFiltersCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #3b82f6;
  color: white;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
`;

export function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get('status') as LoanStatus | null;
  const riskLevel = searchParams.get('riskLevel') as 'low' | 'medium' | 'high' | null;
  const minAmount = searchParams.get('minAmount');
  const maxAmount = searchParams.get('maxAmount');
  const minCreditScore = searchParams.get('minCreditScore');
  const search = searchParams.get('search');

  const activeFilterCount = [status, riskLevel, minAmount, maxAmount, minCreditScore, search].filter(
    Boolean
  ).length;

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <Container>
      <Title>
        <Filter size={20} />
        필터
        {activeFilterCount > 0 && <ActiveFiltersCount>{activeFilterCount}</ActiveFiltersCount>}
      </Title>

      <FilterGrid>
        <FilterGroup>
          <Label>검색</Label>
          <SearchWrapper>
            <Search size={16} />
            <Input
              type="text"
              placeholder="신청자명, 신청번호"
              value={search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </SearchWrapper>
        </FilterGroup>

        <FilterGroup>
          <Label>상태</Label>
          <Select value={status || ''} onChange={(e) => updateFilter('status', e.target.value)}>
            <option value="">전체</option>
            <option value="pending">대기</option>
            <option value="reviewing">검토중</option>
            <option value="approved">승인</option>
            <option value="rejected">거절</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>위험도</Label>
          <Select
            value={riskLevel || ''}
            onChange={(e) => updateFilter('riskLevel', e.target.value)}
          >
            <option value="">전체</option>
            <option value="low">낮음</option>
            <option value="medium">중간</option>
            <option value="high">높음</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>최소 대출액</Label>
          <Input
            type="number"
            placeholder="0"
            value={minAmount || ''}
            onChange={(e) => updateFilter('minAmount', e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <Label>최대 대출액</Label>
          <Input
            type="number"
            placeholder="100,000,000"
            value={maxAmount || ''}
            onChange={(e) => updateFilter('maxAmount', e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <Label>최소 신용점수</Label>
          <Input
            type="number"
            placeholder="500"
            value={minCreditScore || ''}
            onChange={(e) => updateFilter('minCreditScore', e.target.value)}
          />
        </FilterGroup>
      </FilterGrid>

      {activeFilterCount > 0 && (
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <ClearButton onClick={clearFilters}>
            <X size={16} />
            필터 초기화
          </ClearButton>
        </div>
      )}
    </Container>
  );
}
