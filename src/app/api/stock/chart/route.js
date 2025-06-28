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
    const today = new Date();
    const endDate = today.toISOString().slice(0, 10).replace(/-/g, '');
    let startDate = new Date();

    let periodCode = 'D'; // 기본값: 일봉
    if (period === 'weekly') {
        periodCode = 'W';
        startDate.setDate(today.getDate() - 7 * 30); // 약 30주
    } else if (period === 'monthly') {
        periodCode = 'M';
        startDate.setMonth(today.getMonth() - 12); // 12개월
    } else { // daily
        startDate.setDate(today.getDate() - 30); // 30일
    }
    const formattedStartDate = startDate.toISOString().slice(0, 10).replace(/-/g, '');


    // KIS API: 국내주식기간별시세
    const url = `${BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice?fid_cond_mrkt_div_code=J&fid_input_iscd=${symbol}&fid_input_date_1=${formattedStartDate}&fid_input_date_2=${endDate}&fid_period_div_code=${periodCode}&fid_org_adj_prc=1`;

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
    })).reverse(); // 최신 데이터가 뒤에 오도록 reverse

    return NextResponse.json({
      labels: chartData.map((d) => d.date),
      prices: chartData.map((d) => d.close),
    });
  } catch (error) {
    console.error('Chart API Error:', error.message);
    return NextResponse.json({ error: '차트 데이터를 가져오지 못했습니다.' }, { status: 500 });
  }
}