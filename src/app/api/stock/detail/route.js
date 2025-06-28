import { NextResponse } from 'next/server';
import { fetchWithToken } from '@/lib/kis-api';

const IS_TEST_ENV = process.env.KOREA_INVEST_ENV === 'test';
const BASE_URL = IS_TEST_ENV
  ? 'https://openapivts.koreainvestment.com:29443'
  : 'https://openapi.koreainvestment.com:9443';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: '종목 코드가 필요합니다.' }, { status: 400 });
  }

  try {
    const url = `${BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price?fid_cond_mrkt_div_code=J&fid_input_iscd=${symbol}`;
    const data = await fetchWithToken(url, {
      method: 'GET',
      headers: {
        'tr_id': 'FHKST01010100',
      },
    });

    const stock = {
      name: data.output.hts_kor_isnm,
      symbol: data.output.stck_shrn_iscd,
      price: parseInt(data.output.stck_prpr),
      changePercent: parseFloat(data.output.prdy_ctrt),
      volume: parseInt(data.output.acml_vol),
      openPrice: parseInt(data.output.stck_oprc),
      highPrice: parseInt(data.output.stck_hgpr),
      lowPrice: parseInt(data.output.stck_lwpr),
      logoUrl: null,
    };

    return NextResponse.json(stock);
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: '주식 데이터를 가져오지 못했습니다.' }, { status: 500 });
  }
}