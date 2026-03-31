import { useSearchParams } from 'react-router';
import styled from '@emotion/styled';
import { Search, Filter, X, PlayCircle, PauseCircle, Sliders } from 'lucide-react';
import { FilterParams, TransactionStatus, RiskLevel, TransactionType } from '../../types/fds';
import { useStreamStore } from '../../store/fds-store';

const Container = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #334155;
  margin-bottom: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #f1f5f9;
`;

const StreamControl = styled.div`
  display: flex;
  gap: 8px;
`;

const StreamButton = styled.button<{ isStreaming: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: ${props => props.isStreaming 
    ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
    : 'linear-gradient(135deg, #22c55e, #16a34a)'};
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${props => props.isStreaming 
    ? 'rgba(239, 68, 68, 0.3)' 
    : 'rgba(34, 197, 94, 0.3)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.isStreaming 
      ? 'rgba(239, 68, 68, 0.4)' 
      : 'rgba(34, 197, 94, 0.4)'};
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Select = styled.select`
  padding: 12px 14px;
  border: 1px solid #334155;
  border-radius: 10px;
  font-size: 14px;
  color: #e2e8f0;
  background: #0f172a;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  option {
    background: #0f172a;
    color: #e2e8f0;
  }
`;

const Input = styled.input`
  padding: 12px 14px;
  border: 1px solid #334155;
  border-radius: 10px;
  font-size: 14px;
  color: #e2e8f0;
  background: #0f172a;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #475569;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
  }

  input {
    padding-left: 44px;
  }
`;

const ClearButton = styled.button`
  padding: 12px 20px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 10px;
  color: #60a5fa;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.5);
  }
`;

const ActiveFiltersCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
`;

export function DarkFilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isStreaming, startStreaming, stopStreaming } = useStreamStore();

  const status = searchParams.get('status') as TransactionStatus | null;
  const riskLevel = searchParams.get('riskLevel') as RiskLevel | null;
  const type = searchParams.get('type') as TransactionType | null;
  const minAmount = searchParams.get('minAmount');
  const maxAmount = searchParams.get('maxAmount');
  const minRiskScore = searchParams.get('minRiskScore');
  const search = searchParams.get('search');

  const activeFilterCount = [status, riskLevel, type, minAmount, maxAmount, minRiskScore, search].filter(
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

  const toggleStream = () => {
    if (isStreaming) {
      stopStreaming();
    } else {
      startStreaming();
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <Sliders size={22} />
          고급 필터링
          {activeFilterCount > 0 && <ActiveFiltersCount>{activeFilterCount}</ActiveFiltersCount>}
        </Title>
        <StreamControl>
          <StreamButton isStreaming={isStreaming} onClick={toggleStream}>
            {isStreaming ? (
              <>
                <PauseCircle size={18} />
                스트림 중지
              </>
            ) : (
              <>
                <PlayCircle size={18} />
                스트림 시작
              </>
            )}
          </StreamButton>
        </StreamControl>
      </Header>

      <FilterGrid>
        <FilterGroup>
          <Label>검색</Label>
          <SearchWrapper>
            <Search size={18} />
            <Input
              type="text"
              placeholder="사용자명, 거래ID 검색..."
              value={search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </SearchWrapper>
        </FilterGroup>

        <FilterGroup>
          <Label>거래 상태</Label>
          <Select value={status || ''} onChange={(e) => updateFilter('status', e.target.value)}>
            <option value="">전체</option>
            <option value="normal">정상</option>
            <option value="suspicious">의심</option>
            <option value="blocked">차단됨</option>
            <option value="reviewing">검토중</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>위험도</Label>
          <Select
            value={riskLevel || ''}
            onChange={(e) => updateFilter('riskLevel', e.target.value)}
          >
            <option value="">전체</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="critical">Critical</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>거래 유형</Label>
          <Select value={type || ''} onChange={(e) => updateFilter('type', e.target.value)}>
            <option value="">전체</option>
            <option value="transfer">송금</option>
            <option value="withdrawal">출금</option>
            <option value="deposit">입금</option>
            <option value="payment">결제</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>최소 금액</Label>
          <Input
            type="number"
            placeholder="0"
            value={minAmount || ''}
            onChange={(e) => updateFilter('minAmount', e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <Label>최소 위험점수</Label>
          <Input
            type="number"
            placeholder="0 - 100"
            min="0"
            max="100"
            value={minRiskScore || ''}
            onChange={(e) => updateFilter('minRiskScore', e.target.value)}
          />
        </FilterGroup>
      </FilterGrid>

      {activeFilterCount > 0 && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <ClearButton onClick={clearFilters}>
            <X size={16} />
            필터 초기화
          </ClearButton>
        </div>
      )}
    </Container>
  );
}
