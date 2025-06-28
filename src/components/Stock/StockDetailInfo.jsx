'use client';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StockDetailInfo({ stock }) {
  const [period, setPeriod] = useState('hourly');
  const [chartData, setChartData] = useState({ labels: [], prices: [] });
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [chartError, setChartError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoadingChart(true);
      try {
        const response = await fetch(`/api/stock/chart?symbol=${stock.symbol}&period=${period}`);
        if (!response.ok) {
          throw new Error('차트 데이터를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();
        console.log('Fetched chart data:', data);
        setChartData(data);
        setChartError(null);
      } catch (err) {
        console.error('Chart fetch error:', err);
        setChartError(err.message || '차트 데이터를 불러오지 못했습니다.');
      } finally {
        setIsLoadingChart(false);
      }
    };

    fetchChartData();
  }, [stock.symbol, period]);

  const formatPrice = (price) => price.toLocaleString('ko-KR');

  const getPercentColorClass = () => {
    if (stock.changePercent > 0) return 'text-red-600';
    if (stock.changePercent < 0) return 'text-blue-600';
    return '';
  };

  const handlePurchase = () => {
    alert(`${stock.name} ${quantity}주를 구매했습니다! (모의 구매)`);
    setIsModalOpen(false);
    setQuantity(1);
  };

  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: `${stock.name} 종가`,
        data: chartData.prices,
        borderColor: '#0070f3',
        backgroundColor: 'rgba(0, 112, 243, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { title: { display: true, text: period === 'hourly' ? '시간' : '날짜' } },
        y: { title: { display: true, text: '가격 (원)' } },
      },
    },
  };

  return (
    <div className="stock-detail-container">
      <h1 className="stock-name">{stock.name} ({stock.symbol})</h1>
      <div className="stock-info">
        <p><strong>현재가:</strong> {formatPrice(stock.price)}원</p>
        <p className={`stock-percent ${getPercentColorClass()}`}><strong>변동률:</strong> {stock.changePercent}%</p>
        <p><strong>거래량:</strong> {formatPrice(stock.volume)}주</p>
        <p><strong>시가:</strong> {formatPrice(stock.openPrice)}원</p>
        <p><strong>고가:</strong> {formatPrice(stock.highPrice)}원</p>
        <p><strong>저가:</strong> {formatPrice(stock.lowPrice)}원</p>
      </div>

      <div className="chart-container">
        <div className="chart-tabs">
          <button className={`chart-tab ${period === 'hourly' ? 'active' : ''}`} onClick={() => setPeriod('hourly')}>시간별</button>
          <button className={`chart-tab ${period === 'daily' ? 'active' : ''}`} onClick={() => setPeriod('daily')}>일별</button>
          <button className={`chart-tab ${period === 'weekly' ? 'active' : ''}`} onClick={() => setPeriod('weekly')}>주별</button>
          <button className={`chart-tab ${period === 'monthly' ? 'active' : ''}`} onClick={() => setPeriod('monthly')}>월별</button>
        </div>

        {isLoadingChart ? (
          <div className="loading">차트 데이터를 불러오는 중...</div>
        ) : chartError ? (
          <div className="error">차트 에러: {chartError}</div>
        ) : chartData.labels.length === 0 || chartData.prices.length === 0 ? (
          <div className="no-data">차트 데이터가 없습니다.</div>
        ) : (
          <div className="chart">
            <Line data={chartConfig} />
          </div>
        )}
      </div>

      <button className="purchase-button" onClick={() => setIsModalOpen(true)}>구매하기</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{stock.name} 구매</h2>
            <p>현재가: {formatPrice(stock.price)}원</p>
            <label>
              수량:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </label>
            <p>총액: {formatPrice(stock.price * quantity)}원</p>
            <div className="modal-buttons">
              <button onClick={handlePurchase}>구매 확인</button>
              <button onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      <a href="/stock" className="back-link">← 목록으로 돌아가기</a>
    </div>
  );
}