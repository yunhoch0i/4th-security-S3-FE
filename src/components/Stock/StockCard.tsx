import React from 'react';

interface StockCardProps {
    stockId: string;
    stockName: string;
    stockPrice: number;
    stockChange: number;
}

const StockCard: React.FC<StockCardProps> = ({ stockId, stockName, stockPrice, stockChange }) => {
    const changeClass = stockChange >= 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold">{stockName}</h2>
            <p className="text-lg">Price: ${stockPrice.toFixed(2)}</p>
            <p className={`text-lg ${changeClass}`}>
                Change: {stockChange >= 0 ? '+' : ''}{stockChange.toFixed(2)}%
            </p>
        </div>
    );
};

export default StockCard;