// import { NextResponse } from 'next/server';
// import { fetchWithToken } from '@/lib/kis-api';

// const IS_TEST_ENV = process.env.KOREA_INVEST_ENV === 'test';
// const BASE_URL = IS_TEST_ENV
//   ? 'https://openapivts.koreainvestment.com:29443'
//   : 'https://openapi.koreainvestment.com:9443';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const symbol = searchParams.get('symbol');

//   if (!symbol) {
//     return NextResponse.json({ error: '종목 코드가 필요합니다.' }, { status: 400 });
//   }

//   try {
//     const url = `${BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price?fid_cond_mrkt_div_code=J&fid_input_iscd=${symbol}`;
//     const data = await fetchWithToken(url, {
//       method: 'GET',
//       headers: {
//         'tr_id': 'FHKST01010100',
//       },
//     });

//     const stock = {
//       name: data.output.hts_kor_isnm,
//       symbol: data.output.iscd,
//       price: parseInt(data.output.stck_prpr),
//       changePercent: parseFloat(data.output.prdy_ctrt),
//       volume: parseInt(data.output.acml_vol),
//       openPrice: parseInt(data.output.stck_oprc),
//       highPrice: parseInt(data.output.stck_hgpr),
//       lowPrice: parseInt(data.output.stck_lwpr),
//       logoUrl: null,
//     };

//     return NextResponse.json(stock);
//   } catch (error) {
//     console.error('API Error:', error.message);
//     return NextResponse.json({ error: '주식 데이터를 가져오지 못했습니다.' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: '종목 코드가 필요합니다.' }, { status: 400 });
  }

  // 목 데이터 (삼성전자 005930)
  const mockData = [
  {
    name: '삼성전자',
    symbol: '005930',
    price: 55000,
    changePercent: 1.23,
    volume: 12345678,
    openPrice: 54000,
    highPrice: 55500,
    lowPrice: 53800,
    logoUrl: null,
  }, {
    name: '현대차',
    symbol: '005380',
    price: 180000,
    changePercent: -0.56,
    volume: 2345678,
    openPrice: 182000,
    highPrice: 183000,
    lowPrice: 179000,
    logoUrl: null,
  }, {
    name: '네이버',
    symbol: '035420',
    price: 300000,
    changePercent: 0.45,
    volume: 345678,
    openPrice: 298000,
    highPrice: 305000,
    lowPrice: 295000,
    logoUrl: null,
  }
];

  return NextResponse.json(mockData.find(stock => stock.symbol === symbol) || { error: '주식 데이터를 찾을 수 없습니다.' }, { status: 200 });
}