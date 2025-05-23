'use client';
import Link from 'next/link';

export default function StockCard({ stock }) {
  const formatPrice = (price) => {
    return price.toLocaleString('ko-KR');
  };

  const getPercentColorClass = () => {
    if (stock.changePercent > 0) return 'text-red-600';
    if (stock.changePercent < 0) return 'text-blue-600';
    return '';
  };

  return (
    <Link href={`/stock/${stock.symbol}`} className="stock-item">
      <div className="stock-icon"></div>
      <div className="stock-info">
        <img
          src={stock.logoUrl || '/default-logo.png'}
          alt={stock.name}
          className="stock-logo"
        />
        <h3 className="stock-name">{stock.name}</h3>
        <p className="stock-price">{formatPrice(stock.price)}원</p>
      </div>
      <div className={`stock-percent ${getPercentColorClass()}`}>
        <span>{stock.changePercent}%</span>
      </div>
    </Link>
  );
}