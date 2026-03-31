import { BadRequestException, Injectable } from '@nestjs/common';
import { ApplyAccountDto } from './apply-account.dto';

export interface AccountResult {
  accountNumber: string;
  createdAt: string;
}

@Injectable()
export class AccountService {
  apply(dto: ApplyAccountDto): AccountResult {
    if (!dto.agreement.termsOfService || !dto.agreement.privacyPolicy) {
      throw new BadRequestException('필수 약관에 동의해야 합니다.');
    }

    if (Math.random() < 0.1) {
      throw new BadRequestException('계좌 개설 신청에 실패했습니다. 다시 시도해주세요.');
    }

    const accountNumber = '110-' + Math.random().toString().slice(2, 11);
    return { accountNumber, createdAt: new Date().toISOString() };
  }
}
