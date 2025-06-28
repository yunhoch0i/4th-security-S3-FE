// import { NextResponse } from 'next/server';
// import { fetchWithToken } from '@/lib/kis-api';

// const popularSymbols = ['005930', '000660', '005380', '035420', '035720'];

// async function fetchMultipleStocks(symbols) {
//   const url = `https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/intstock-multprice?STND_ISCD=${symbols.join(',')}`;
//   const data = await fetchWithToken(url, {
//     method: 'GET',
//     headers: {
//       'tr_id': 'FHKST11300006',
//     },
//   });

//   return data.output.map((item) => ({
//     name: item.stck_name,
//     symbol: item.stck_iscd,
//     price: parseInt(item.stck_prpr),
//     changePercent: parseFloat(item.prdy_ctrt),
//     logoUrl: null,
//   }));
// }

// async function searchStockByName(query) {
//   const url = `https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/search-stock-info?PDNO=&PRDT_TYPE_CD=300&PRDT_NAME=${encodeURIComponent(query)}`;
//   const data = await fetchWithToken(url, {
//     method: 'GET',
//     headers: {
//       'tr_id': 'CTPF1002R',
//     },
//   });

//   return data.output?.stck_shrn_iscd || null;
// }

// async function fetchStockPrice(symbol) {
//   const url = `https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price?fid_cond_mrkt_div_code=J&fid_input_iscd=${symbol}`;
//   const data = await fetchWithToken(url, {
//     method: 'GET',
//     headers: {
//       'tr_id': 'FHKST01010100',
//     },
//   });

//   return {
//     name: data.output.hts_kor_isnm,
//     symbol: data.output.iscd,
//     price: parseInt(data.output.stck_prpr),
//     changePercent: parseFloat(data.output.prdy_ctrt),
//     logoUrl: null,
//   };
// }

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get('search');

//   try {
//     if (query) {
//       const symbol = await searchStockByName(query);
//       if (!symbol) {
//         return NextResponse.json([]);
//       }
//       const stock = await fetchStockPrice(symbol);
//       return NextResponse.json([stock]);
//     } else {
//       const stocks = await fetchMultipleStocks(popularSymbols);
//       return NextResponse.json(stocks);
//     }
//   } catch (error) {
//     console.error('API Error:', error.message);
//     return NextResponse.json({ error: '데이터 가져오기 실패' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';

const popularSymbols = ['005930', '005380', '035420', '035720', '000660'];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search');

  // 목 데이터
  const mockStocks = [
    {
      name: '삼성전자',
      symbol: '005930',
      price: 55000,
      changePercent: 1.23,
      logoUrl: null,
    },
    {
      name: '현대차',
      symbol: '005380',
      price: 180000,
      changePercent: -0.50,
      logoUrl: null,
    },
    {
      name: 'NAVER',
      symbol: '035420',
      price: 185000,
      changePercent: 0.75,
      logoUrl: null,
    },
    {
      name: '카카오',
      symbol: '035720',
      price: 45000,
      changePercent: -1.10,
      logoUrl: null,
    },
    {
      name: 'SK하이닉스',
      symbol: '000660',
      price: 165000,
      changePercent: 2.00,
      logoUrl: null,
    },
  ];

  if (query) {
    // 검색 기능 (간단히 symbol로 필터링)
    const filteredStocks = mockStocks.filter((stock) =>
      stock.name.toLowerCase().includes(query.toLowerCase()) ||
      stock.symbol.includes(query)
    );
    return NextResponse.json(filteredStocks);
  } else {
    return NextResponse.json(mockStocks);
  }
}
