// Mock API calls for account opening

export async function sendVerificationCode(phoneNumber: string): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Random failure (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
  }
  
  console.log('Verification code sent to:', phoneNumber);
}

export async function verifyCode(phoneNumber: string, code: string): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Random failure (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('인증 확인에 실패했습니다. 다시 시도해주세요.');
  }
  
  // Accept any 6-digit code for demo
  return code.length === 6;
}

export async function submitAccountApplication(data: any): Promise<string> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Random failure (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('계좌 개설 신청에 실패했습니다. 다시 시도해주세요.');
  }
  
  // Generate random account number
  const accountNumber = '110-' + Math.random().toString().slice(2, 11);
  return accountNumber;
}
