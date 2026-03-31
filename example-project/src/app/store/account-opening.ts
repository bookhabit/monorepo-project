import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type FunnelStep = '약관동의' | '본인인증' | '정보입력' | '완료';

export interface IdentityData {
  phoneNumber: string;
  verificationCode: string;
  isVerified: boolean;
}

export interface InformationData {
  name: string;
  birthDate: string;
  address: string;
  detailAddress: string;
  occupation: string;
  income: string;
  investmentPurpose: string;
}

export interface TermsData {
  requiredTerms: {
    service: boolean;
    privacy: boolean;
    finance: boolean;
  };
  optionalTerms: {
    marketing: boolean;
    thirdParty: boolean;
  };
}

export interface CompleteData {
  accountNumber: string;
  createdAt: string;
}

// Jotai atoms with localStorage persistence
export const currentStepAtom = atomWithStorage<FunnelStep>('currentStep', '약관동의');

export const identityDataAtom = atomWithStorage<IdentityData>('identityData', {
  phoneNumber: '',
  verificationCode: '',
  isVerified: false,
});

export const informationDataAtom = atomWithStorage<InformationData>('informationData', {
  name: '',
  birthDate: '',
  address: '',
  detailAddress: '',
  occupation: '',
  income: '',
  investmentPurpose: '',
});

export const termsDataAtom = atomWithStorage<TermsData>('termsData', {
  requiredTerms: {
    service: false,
    privacy: false,
    finance: false,
  },
  optionalTerms: {
    marketing: false,
    thirdParty: false,
  },
});

export const completeDataAtom = atomWithStorage<CompleteData | null>('completeData', null);

// Progress atom (derived)
export const progressAtom = atom((get) => {
  const step = get(currentStepAtom);
  const steps: FunnelStep[] = ['약관동의', '본인인증', '정보입력', '완료'];
  const currentIndex = steps.indexOf(step);
  return ((currentIndex + 1) / steps.length) * 100;
});

// Reset atom
export const resetFunnelAtom = atom(null, (get, set) => {
  set(currentStepAtom, '약관동의');
  set(identityDataAtom, {
    phoneNumber: '',
    verificationCode: '',
    isVerified: false,
  });
  set(informationDataAtom, {
    name: '',
    birthDate: '',
    address: '',
    detailAddress: '',
    occupation: '',
    income: '',
    investmentPurpose: '',
  });
  set(termsDataAtom, {
    requiredTerms: {
      service: false,
      privacy: false,
      finance: false,
    },
    optionalTerms: {
      marketing: false,
      thirdParty: false,
    },
  });
  set(completeDataAtom, null);
});