import { api } from '../utils/api'; 
import { StockDetail } from '../features/stock/stockTypes'; 

export const fetchStockDetails = async (stockId: string | string[]): Promise<StockDetail> => {
  try {
    const response = await api.get(`/stock/${stockId}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch stock details:', error);
    throw new Error('Failed to fetch stock details');
  }
};
