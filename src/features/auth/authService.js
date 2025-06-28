// 'src/utils/api.js'에서 만든 'api' 객체를 가져옵니다.
import { api } from '../../utils/api';

/**
 * 로그인 요청을 처리하는 함수
 */
export const login = async (email, password) => {
  try {
    // '/api/auth/login'은 'src/app/api/auth/login/route.js'를 가리킵니다.
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      throw new Error('로그인 중 네트워크 오류가 발생했습니다.');
    }
  }
};

/**
 * 회원가입 요청을 처리하는 함수
 */
export const signup = async (userData) => {
  try {
    // '/api/v1/members/signup'은 실제 외부 API 서버의 경로입니다.
    // baseURL을 '/api'가 아닌 실제 서버 주소로 변경해야 호출 가능합니다.
    // (지금은 테스트를 위해 그대로 둡니다)
    const response = await api.post('/v1/members/signup', userData);

    if (response.status === 201) {
      return { success: true, user: response.data };
    } else {
      return { success: false, message: '알 수 없는 응답입니다.' };
    }
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data.message || '회원가입 실패' };
    } else {
      throw new Error('회원가입 중 네트워크 오류가 발생했습니다.');
    }
  }
};