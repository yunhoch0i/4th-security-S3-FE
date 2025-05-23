'use client';
import { useState, useEffect } from 'react';
import StockCard from '../../components/Stock/StockCard';

export default function StockList() {
  const [activeTab, setActiveTab] = useState('주식');
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStocks = async () => {
    setIsLoading(true);
    try {
      const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
      const url = activeTab === '주식' ? `/api/stock${query}` : `/api/coins`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('데이터를 불러오는 데 실패했습니다.');

      const data = await response.json();
      console.log('Fetched stocks:', data);
      setStocks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
      setStocks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, [activeTab, searchTerm]);

  return (
    <div className="stock-container">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="주식 또는 코인 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="tab-container">
        <button
          className={`tab ${activeTab === '주식' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('주식');
            setSearchTerm('');
          }}
        >
          주식
        </button>
        <button
          className={`tab ${activeTab === '코인' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('코인');
            setSearchTerm('');
          }}
        >
          코인
        </button>
      </div>

      {isLoading ? (
        <div className="loading">데이터를 불러오는 중...</div>
      ) : error ? (
        <div className="error">에러: {error}</div>
      ) : stocks.length === 0 ? (
        <div className="no-results">검색 결과가 없습니다.</div>
      ) : (
        <div className="stock-list">
          {stocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
}