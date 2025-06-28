import { NextResponse } from 'next/server';
import { fetchWithToken } from '@/lib/kis-api';

const popularSymbols = ['005930', '005380', '035420', '035720', '000660'];

async function fetchStockPrice(symbol) {
  const url = `https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price?fid_cond_mrkt_div_code=J&fid_input_iscd=${symbol}`;
  const data = await fetchWithToken(url, {
    method: 'GET',
    headers: {
      'tr_id': 'FHKST01010100',
    },
  });

  return {
    name: data.output.hts_kor_isnm,
    symbol: data.output.stck_shrn_iscd,
    price: parseInt(data.output.stck_prpr, 10),
    changePercent: parseFloat(data.output.prdy_ctrt),
    logoUrl: null,
  };
}

async function searchStockByName(query) {
    const url = `https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/search-stock-info?PDNO=${encodeURIComponent(query)}&PRDT_TYPE_CD=300`;
    const data = await fetchWithToken(url, {
        method: 'GET',
        headers: {
            'tr_id': 'CTPF1002R',
        },
    });

    if (data.output2 && data.output2.length > 0) {
        // 검색된 종목들의 상세 정보를 가져옵니다.
        const searchResults = await Promise.all(data.output2.map(item => fetchStockPrice(item.prdt_code)));
        return searchResults;
    }
    return [];
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search');

  try {
    if (query) {
      const stocks = await searchStockByName(query);
      return NextResponse.json(stocks);
    } else {
      const stocks = await Promise.all(popularSymbols.map(symbol => fetchStockPrice(symbol)));
      return NextResponse.json(stocks);
    }
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: '데이터 가져오기 실패' }, { status: 500 });
  }
}