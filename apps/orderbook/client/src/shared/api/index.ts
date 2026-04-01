// src/shared/api/index.ts
import { createPublicClient } from './client';

// 환경 변수(Vite 기준)를 사용하여 Base URL 설정
const BASE_URL = 'http://localhost:4002';

export const publicApi = createPublicClient(BASE_URL);
