export interface Stock {
    id: string;
    name: string;
    price: number;
    change: number; // Price change percentage
    volume: number; // Trading volume
}

export interface StockList {
    stocks: Stock[];
    total: number; // Total number of stocks
}

export interface StockDetail {
    id: string;                 // 주식 고유 ID
    name: string;               // 종목명
    ticker: string;            // 티커 (예: AAPL)
    currentPrice: number;      // 현재가
    change: number;            // 등락폭
    changeRate: number;        // 등락률
    high: number;              // 고가
    low: number;               // 저가
    open: number;              // 시가
    previousClose: number;     // 전일 종가
    volume: number;            // 거래량
    marketCap: number;         // 시가총액
    sector?: string;           // 업종 (선택)
    description?: string;      // 종목 설명 (선택)
    logoUrl?: string;          // 로고 URL (선택)
  }