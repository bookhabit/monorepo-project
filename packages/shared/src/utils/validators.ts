// ─── 전화번호 ─────────────────────────────────────────────────────────────────

/**
 * 한국 휴대폰 번호 유효성 검사
 * 허용: 010-1234-5678 / 01012345678 / 010.1234.5678
 */
export function isValidPhone(value: string): boolean {
  const cleaned = value.replace(/[\s\-\.]/g, '');
  return /^01[016789]\d{7,8}$/.test(cleaned);
}

/**
 * 전화번호를 "010-1234-5678" 형식으로 포맷
 */
export function formatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return value;
}

// ─── 계좌번호 ─────────────────────────────────────────────────────────────────

/**
 * 계좌번호 유효성 검사 (숫자, 하이픈 혼용, 10~14자리)
 */
export function isValidAccountNumber(value: string): boolean {
  const cleaned = value.replace(/[\s\-]/g, '');
  return /^\d{10,14}$/.test(cleaned);
}

/**
 * 계좌번호를 마스킹 처리
 * @example maskAccountNumber("123456789012") → "123456****12"
 */
export function maskAccountNumber(value: string): string {
  const cleaned = value.replace(/[\s\-]/g, '');
  if (cleaned.length < 6) return value;
  const head = cleaned.slice(0, 6);
  const tail = cleaned.slice(-2);
  const masked = '*'.repeat(cleaned.length - 8);
  return `${head}${masked}${tail}`;
}

// ─── 주민등록번호 ─────────────────────────────────────────────────────────────

/**
 * 주민등록번호 형식 유효성 검사 (체크섬 포함)
 * 입력 형식: "YYMMDD-GXXXXC" 또는 "YYMMDGGXXXXC" (13자리)
 */
export function isValidRRN(value: string): boolean {
  const cleaned = value.replace('-', '');
  if (!/^\d{13}$/.test(cleaned)) return false;

  // 생년월일 기초 검증
  const month = Number(cleaned.slice(2, 4));
  const day = Number(cleaned.slice(4, 6));
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // 체크섬 검증
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
  const digits = cleaned.split('').map(Number);
  const sum = weights.reduce((acc, w, i) => acc + w * (digits[i] ?? 0), 0);
  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === digits[12];
}

/**
 * 주민등록번호 뒷자리 마스킹
 * @example maskRRN("901225-1234567") → "901225-1******"
 */
export function maskRRN(value: string): string {
  const cleaned = value.replace('-', '');
  if (cleaned.length !== 13) return value;
  return `${cleaned.slice(0, 6)}-${cleaned[6]}******`;
}

// ─── 이메일 ───────────────────────────────────────────────────────────────────

/**
 * 이메일 유효성 검사
 */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// ─── 사업자등록번호 ───────────────────────────────────────────────────────────

/**
 * 사업자등록번호 유효성 검사 (체크섬 포함)
 * 형식: "123-45-67890" 또는 "1234567890" (10자리)
 */
export function isValidBusinessNumber(value: string): boolean {
  const cleaned = value.replace(/[\s\-]/g, '');
  if (!/^\d{10}$/.test(cleaned)) return false;

  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];
  const digits = cleaned.split('').map(Number);
  const sum =
    weights.reduce((acc, w, i) => acc + w * (digits[i] ?? 0), 0) +
    Math.floor(((digits[8] ?? 0) * 5) / 10);
  return (10 - (sum % 10)) % 10 === digits[9];
}
