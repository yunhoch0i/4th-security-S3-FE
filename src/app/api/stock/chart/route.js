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

  try {
    // KIS API: 일별/주별/월별 시세 조회
    const url = `${BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-price?fid_cond_mrkt_div_code=J&fid_input_iscd=${symbol}&fid_period_div_code=${period === 'daily' ? 'D' : period === 'weekly' ? 'W' : 'M'}&fid_org_adj_prc=0`;
    const data = await fetchWithToken(url, {
      method: 'GET',
      headers: {
        'tr_id': 'FHKST03010100',
      },
    });

    // 데이터 가공
    const chartData = data.output2.map((item) => ({
      date: item.stck_bsop_date, // 날짜 (YYYYMMDD)
      close: parseInt(item.stck_clpr), // 종가
    }));

    // 일별: 최근 30일, 주별: 최근 12주, 월별: 최근 12개월
    const limit = period === 'daily' ? 30 : period === 'weekly' ? 12 : 12;
    const slicedData = chartData.slice(0, limit).reverse(); // 최신순으로 정렬

    return NextResponse.json({
      labels: slicedData.map((d) => d.date),
      prices: slicedData.map((d) => d.close),
    });
  } catch (error) {
    console.error('Chart API Error:', error.message);
    return NextResponse.json({ error: '차트 데이터를 가져오지 못했습니다.' }, { status: 500 });
  }
}