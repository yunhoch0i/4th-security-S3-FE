import { NextResponse } from 'next/server';
import { fetchWithToken } from '@/lib/kis-api';

const IS_TEST_ENV = process.env.KOREA_INVEST_ENV === 'test';
const BASE_URL = IS_TEST_ENV
  ? 'https://openapivts.koreainvestment.com:29443'
  : 'https://openapi.koreainvestment.com:9443';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const period = searchParams.get('period'); // 'daily', 'weekly', 'monthly'

  if (!symbol || !period) {
    return NextResponse.json({ error: '종목 코드와 기간이 필요합니다.' }, { status: 400 });
  }

//   try {
//     // KIS API: 일별/주별/월별 시세 조회
//     const url = `${BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-price?fid_cond_mrkt_div_code=J&fid_input_iscd=${symbol}&fid_period_div_code=${period === 'daily' ? 'D' : period === 'weekly' ? 'W' : 'M'}&fid_org_adj_prc=0`;
//     const data = await fetchWithToken(url, {
//       method: 'GET',
//       headers: {
//         'tr_id': 'FHKST03010100',
//       },
//     });

//     // 데이터 가공
//     const chartData = data.output2.map((item) => ({
//       date: item.stck_bsop_date, // 날짜 (YYYYMMDD)
//       close: parseInt(item.stck_clpr), // 종가
//     }));

//     // 일별: 최근 30일, 주별: 최근 12주, 월별: 최근 12개월
//     const limit = period === 'daily' ? 30 : period === 'weekly' ? 12 : 12;
//     const slicedData = chartData.slice(0, limit).reverse(); // 최신순으로 정렬

//     return NextResponse.json({
//       labels: slicedData.map((d) => d.date),
//       prices: slicedData.map((d) => d.close),
//     });
//   } catch (error) {
//     console.error('Chart API Error:', error.message);
//     return NextResponse.json({ error: '차트 데이터를 가져오지 못했습니다.' }, { status: 500 });
//   }
// }



// 목 데이터
    const mockHourlyData = {
    labels: Array.from({ length: 24 }, (_, i) => {
      const hour = (16 - i + 48) % 24; // 16:48부터 24시간 전까지 1시간 단위
      return `${hour.toString().padStart(2, '0')}:00`; // "16:00", "15:00", ...
    }).reverse(),
    prices: Array.from({ length: 24 }, (_, i) => {
      const basePrice = 54900; // 기준 가격
      const randomOffset = Math.floor(Math.random() * 201) - 100; // -100에서 +100 사이 랜덤 값
      return basePrice + i * 5 + randomOffset; // 시간당 5원 증가 + 랜덤 변동
    }),
  };

  // 일별 데이터 (최근 30일)
  const mockDailyData = {
    labels: Array.from({ length: 30 }, (_, i) => {
      const date = new Date('2025-05-23');
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0].replace(/-/g, '');
    }).reverse(),
    prices: Array.from({ length: 30 }, (_, i) => {
      const basePrice = 53000;
      const randomOffset = Math.floor(Math.random() * 201) - 100;
      return basePrice + i * 70 + randomOffset;
    }),
  };

  // 주별 데이터 (최근 12주)
  const mockWeeklyData = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const date = new Date('2025-05-19');
      date.setDate(date.getDate() - i * 7);
      return date.toISOString().split('T')[0].replace(/-/g, '');
    }).reverse(),
    prices: Array.from({ length: 12 }, (_, i) => {
      const basePrice = 51800;
      const randomOffset = Math.floor(Math.random() * 201) - 100;
      return basePrice + i * 300 + randomOffset;
    }),
  };

  // 월별 데이터 (최근 12개월)
  const mockMonthlyData = {
    labels: Array.from({ length: 12 }, (_, i) => {
      const date = new Date('2025-05-01');
      date.setMonth(date.getMonth() - i);
      return date.toISOString().split('T')[0].replace(/-/g, '');
    }).reverse(),
    prices: Array.from({ length: 12 }, (_, i) => {
      const basePrice = 49000;
      const randomOffset = Math.floor(Math.random() * 201) - 100;
      return basePrice + i * 500 + randomOffset;
    }),
  };

  const mockData = {
    hourly: mockHourlyData,
    daily: mockDailyData,
    weekly: mockWeeklyData,
    monthly: mockMonthlyData,
  };

  return NextResponse.json(mockData[period] || mockData.daily);
}