
import axios from 'axios';

// 기본 Axios 인스턴스 설정
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 쿠키 인증 등 필요 시 활성화
});

// 요청 인터셉터 (선택)
api.interceptors.request.use(
  (config) => {
    // 예: 토큰 자동 삽입
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (선택)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API ERROR]', error);
    return Promise.reject(error);
  }
);
