import fs from 'fs/promises';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), 'token_cache.json');
const TOKEN_EXPIRY = 86400 * 1000; // 1일(86,400초)

// 캐시된 토큰 읽기
async function getCachedToken() {
  try {
    const data = await fs.readFile(CACHE_FILE, 'utf-8');
    const { token, timestamp } = JSON.parse(data);
    if (Date.now() - timestamp < TOKEN_EXPIRY) {
      return token;
    }
    console.log('Cached token expired');
    return null;
  } catch (err) {
    // 파일이 없는 경우는 정상적인 상황일 수 있으므로, 에러 메시지를 간소화합니다.
    if (err.code !== 'ENOENT') {
        console.error('Failed to read token cache:', err.message);
    }
    return null;
  }
}

// 캐시된 토큰 저장
async function setCachedToken(token) {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify({ token, timestamp: Date.now() }));
    console.log('Token cached successfully');
  } catch (err) {
    console.error('Failed to cache token:', err.message);
  }
}

// 새 토큰 발급
async function fetchNewToken() {
  // 환경 변수가 설정되지 않았다면 에러를 발생시켜 미리 문제를 파악합니다.
  if (!process.env.KOREA_INVEST_APP_KEY || !process.env.KOREA_INVEST_APP_SECRET) {
    throw new Error('KOREA_INVEST_APP_KEY and KOREA_INVEST_APP_SECRET must be set in .env.local');
  }

  try {
    const response = await fetch('https://openapi.koreainvestment.com:29443/oauth2/tokenP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        appkey: process.env.KOREA_INVEST_APP_KEY,
        appsecret: process.env.KOREA_INVEST_APP_SECRET,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Token fetch response error:', errorBody);
      throw new Error(`Token fetch failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Token fetch error:', error);
    // 'fetch failed' 에러는 여기서 다시 던져서 상위 호출자가 인지하도록 합니다.
    throw error;
  }
}

// 토큰 가져오기 (캐시 우선, 없으면 새로 발급)
export async function getAccessToken() {
  const cachedToken = await getCachedToken();
  if (cachedToken) return cachedToken;

  try {
    const newToken = await fetchNewToken();
    if (newToken) {
      await setCachedToken(newToken);
      return newToken;
    }
    return null;
  } catch (error) {
    // fetchNewToken에서 발생한 에러를 그대로 다시 던집니다.
    throw new Error('Failed to obtain a new access token.');
  }
}

// API 호출
export async function fetchWithToken(url, options) {
  let token;
  try {
    token = await getAccessToken();
  } catch (error) {
    // getAccessToken에서 발생한 에러를 처리합니다.
    console.error('Error getting access token:', error.message);
    throw new Error('Failed to obtain access token.');
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`,
    'appkey': process.env.KOREA_INVEST_APP_KEY,
    'appsecret': process.env.KOREA_INVEST_APP_SECRET,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  const responseText = await response.text();

  if (!response.ok) {
    console.error('API call failed with status:', response.status, 'Response:', responseText);
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Failed to parse JSON:', responseText);
    throw new Error('Unexpected response format from API');
  }
}