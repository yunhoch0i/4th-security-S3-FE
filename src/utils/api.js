import axios from 'axios';

// 실제 API 서버 또는 우리 프로젝트 내부의 목(Mock) API 서버에
// 요청을 보내기 위한 기본 설정을 하는 파일입니다.
export const api = axios.create({
  // baseURL을 '/api'로 설정하면, 우리 프로젝트 내부의
  // /src/app/api/ 폴더에 있는 API 라우트를 호출하게 됩니다.
  baseURL: 'http://54.159.152.207:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 모든 API 응답을 중간에서 확인하여 공통 에러 처리를 하는 부분입니다.
// 필수는 아니지만, 디버깅에 유용합니다.
api.interceptors.response.use(
  (response) => {
    // 성공적인 응답은 그대로 반환합니다.
    return response;
  },
  (error) => {
    // 실패한 응답은 콘솔에 에러를 출력합니다.
    console.error('[API 통신 에러]', error);
    return Promise.reject(error);
  }
);