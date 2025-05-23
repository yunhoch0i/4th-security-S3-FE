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
    console.log('No valid token cache found:', err.message);
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
      throw new Error(`Token fetch failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Token fetch error:', error.message);
    return null;
  }
}

// 토큰 가져오기 (캐시 우선, 없으면 새로 발급)
export async function getAccessToken() {
  const cachedToken = await getCachedToken();
  if (cachedToken) return cachedToken;

  const newToken = await fetchNewToken();
  if (newToken) {
    await setCachedToken(newToken);
    return newToken;
  }
  return null;
}

// API 호출 시 401 에러 처리 포함
export async function fetchWithToken(url, options) {
  let token = await getAccessToken();
  if (!token) {
    throw new Error('Failed to obtain access token');
  }

  const headers = {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`,
    'appkey': process.env.KOREA_INVEST_APP_KEY,
    'appsecret': process.env.KOREA_INVEST_APP_SECRET,
    ...options.headers,
  };

  let response = await fetch(url, { ...options, headers });

  // 401 에러 시 토큰 갱신 후 재시도
  if (response.status === 401) {
    console.log('401 Unauthorized, refreshing token...');
    const newToken = await fetchNewToken();
    if (!newToken) {
      throw new Error('Failed to refresh access token');
    }
    await setCachedToken(newToken);
    headers.authorization = `Bearer ${newToken}`;
    response = await fetch(url, { ...options, headers });
  }

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}