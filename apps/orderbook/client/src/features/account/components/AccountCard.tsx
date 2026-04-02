import React from 'react';

/**
 * @param {'cash' | 'stock' | 'total'} type - 카드의 타입 (현금, 주식, 총평가액)
 * @param {string} title - 카드의 제목 (보유 현금, 보유 주식 등)
 * @param {string | number} value - 메인 수치 (10,000,000, 0 등)
 * @param {string} unit - 단위 (원, 주)
 * @param {string} subText - 하단 설명 (주문 가능 금액, 종목명, 수익률 등)
 * @param {React.ReactNode} icon - 상단 좌측 아이콘
 * @returns {JSX.Element} 재사용 가능한 계좌 카드 컴포넌트
 */

interface AccountCardProps {
  /** 카드의 성격 (디자인 분기점) */
  type: 'cash' | 'stock' | 'total';
  /** 상단에 표시될 아이콘 */
  icon: React.ReactNode;
  /** 카드의 제목 (예: 보유 현금) */
  title: string;
  /** 메인 수치 */
  value: number;
  /** 단위 (원 또는 주) */
  unit: '원' | '주';
  /** 하단 설명 문구 (수익률, 종목명 등) */
  subText: string;
}

const AccountCard: React.FC<AccountCardProps> = ({ type, title, value, unit, subText, icon }) => {
  // type이 'total'일 때만 하단 텍스트를 초록색으로 표시
  const isTotal = type === 'total';

  return (
    <div className={`card-wrapper ${isTotal ? 'total-style' : ''}`}>
      {/* 헤더: 아이콘 + 제목 */}
      <div className="card-header">
        <span className="icon">{icon}</span>
        <span className="title">{title}</span>
      </div>

      {/* 메인 값: 큰 흰색 글씨 + 단위 */}
      <div className="card-body">
        <span className="value">{value.toLocaleString()}</span>
        <span className="unit">{unit}</span>
      </div>

      {/* 하단 텍스트: 회색 또는 초록색 */}
      <div className={`card-footer ${isTotal ? 'highlight' : ''}`}>{subText}</div>
    </div>
  );
};

export default AccountCard;
