import { useEffect, useState } from 'react';
import { stockService } from '../features/stock/stockService';
import { StockType } from '../features/stock/stockTypes';

export const useStock = () => {
    const [stocks, setStocks] = useState<StockType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                setLoading(true);
                const data = await stockService.getStocks();
                setStocks(data);
            } catch (err) {
                setError('Failed to fetch stocks');
            } finally {
                setLoading(false);
            }
        };

        fetchStocks();
    }, []);

    return { stocks, loading, error };
};