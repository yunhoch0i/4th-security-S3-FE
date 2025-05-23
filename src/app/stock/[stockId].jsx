'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import StockDetailInfo from '@/components/Stock/StockDetailInfo';

export default function StockDetail() {
  const { stockId } = useParams();
  const [stock, setStock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/stock/detail?symbol=${stockId}`);
        if (!response.ok) {
          throw new Error('주식 데이터를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();
        setStock(data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || '알 수 없는 오류가 발생했습니다.');
        setStock(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (stockId) {
      fetchStockDetail();
    }
  }, [stockId]);

  if (isLoading) {
    return <div className="loading">데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="error">에러: {error}</div>;
  }

  if (!stock) {
    return <div className="no-data">주식 데이터를 찾을 수 없습니다.</div>;
  }

  return <StockDetailInfo stock={stock} />;
}