// ─── Money Formatter ─────────────────────────────────────────────────────────

/**
 * 숫자를 원화 표기로 포맷
 * @example formatMoney(10000) → "10,000원"
 * @example formatMoney(10000, { symbol: false }) → "10,000"
 * @example formatMoney(10000, { unit: '달러' }) → "10,000달러"
 */
export function formatMoney(
  value: number,
  options: { symbol?: boolean; unit?: string } = {},
): string {
  const { symbol = true, unit = '원' } = options;
  const formatted = Math.abs(value).toLocaleString('ko-KR');
  const sign = value < 0 ? '-' : '';
  return symbol ? `${sign}${formatted}${unit}` : `${sign}${formatted}`;
}

/**
 * 숫자를 만/억 단위 축약 표기
 * @example formatMoneyShort(150000000) → "1.5억"
 * @example formatMoneyShort(35000) → "3.5만"
 */
export function formatMoneyShort(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (abs >= 1_0000_0000) {
    const formatted = (abs / 1_0000_0000).toFixed(1).replace(/\.0$/, '');
    return `${sign}${formatted}억`;
  }
  if (abs >= 1_0000) {
    const formatted = (abs / 1_0000).toFixed(1).replace(/\.0$/, '');
    return `${sign}${formatted}만`;
  }
  return `${sign}${abs.toLocaleString('ko-KR')}`;
}

// ─── Date Formatter ──────────────────────────────────────────────────────────

/**
 * 날짜를 상대적 시간으로 표기
 * @example formatRelativeTime(new Date()) → "방금 전"
 * @example formatRelativeTime(threeMinutesAgo) → "3분 전"
 * @example formatRelativeTime(twoDaysAgo) → "2일 전"
 */
export function formatRelativeTime(date: Date | string | number): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  return formatDate(d);
}

/**
 * 날짜를 "YYYY.MM.DD" 형식으로 포맷
 * @example formatDate(new Date('2026-03-26')) → "2026.03.26"
 */
export function formatDate(
  date: Date | string | number,
  separator = '.',
): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}${separator}${mm}${separator}${dd}`;
}

/**
 * 날짜를 "YYYY.MM.DD HH:mm" 형식으로 포맷
 * @example formatDateTime(new Date()) → "2026.03.26 14:30"
 */
export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date);
  const datePart = formatDate(d);
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${datePart} ${hh}:${mi}`;
}
