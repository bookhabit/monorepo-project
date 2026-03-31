import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class VerificationService {
  // 실제 환경에서는 Redis 등으로 관리. 여기서는 in-memory Map 사용
  private readonly codes = new Map<string, string>();

  send(phoneNumber: string): void {
    if (Math.random() < 0.1) {
      throw new BadRequestException('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
    }

    // 6자리 인증번호 생성 (데모: 항상 '123456' 고정)
    const code = '123456';
    this.codes.set(phoneNumber, code);
  }

  verify(phoneNumber: string, code: string): boolean {
    if (Math.random() < 0.1) {
      throw new BadRequestException('인증 확인에 실패했습니다. 다시 시도해주세요.');
    }

    // 데모: 6자리 숫자면 통과
    const verified = code.length === 6 && /^\d{6}$/.test(code);
    if (verified) {
      this.codes.delete(phoneNumber);
    }
    return verified;
  }
}
