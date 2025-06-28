// src/features/contest/contestService.ts

import { Contest, CreateContestInput } from '../contest/contestTypes';
import { api } from '../../utils/api';

// ✅ 전체 대회 목록 조회
export const getContests = async (): Promise<Contest[]> => {
  try {
    const response = await api.get('/contests');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch contests');
  }
};

// ✅ 대회 생성
export const createContest = async (
  contestData: CreateContestInput
): Promise<Contest> => {
  try {
    const response = await api.post('/contests', contestData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create contest');
  }
};

// ✅ 특정 대회 조회
export const getContestById = async (
  contestId: string
): Promise<Contest> => {
  try {
    const response = await api.get(`/contests/${contestId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch contest');
  }
};
