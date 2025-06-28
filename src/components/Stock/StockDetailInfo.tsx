import React from 'react';

interface StockDetailInfoProps {
    stockName: string;
    stockPrice: number;
    stockChange: number;
    stockVolume: number;
}

const StockDetailInfo: React.FC<StockDetailInfoProps> = ({ stockName, stockPrice, stockChange, stockVolume }) => {
    return (
        <div className="stock-detail-info">
            <h2>{stockName}</h2>
            <p>Current Price: ${stockPrice.toFixed(2)}</p>
            <p>Change: {stockChange >= 0 ? '+' : ''}{stockChange.toFixed(2)}%</p>
            <p>Volume: {stockVolume.toLocaleString()}</p>
        </div>
    );
};

export default StockDetailInfo;