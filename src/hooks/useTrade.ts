import { useState } from 'react';
import { tradeService } from '../features/stock/tradeService';
import { StockTrade } from '../features/stock/stockTypes';

const useTrade = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const executeTrade = async (tradeData: StockTrade) => {
        setLoading(true);
        setError(null);
        try {
            const result = await tradeService.executeTrade(tradeData);
            return result;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        executeTrade,
    };
};

export default useTrade;