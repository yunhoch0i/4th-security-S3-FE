import { StockTrade } from '../stock/stockTypes';
import { api } from '../../lib/api/stock';

export const tradeService = {
    buyStock: async (trade: StockTrade) => {
        try {
            const response = await api.buyStock(trade);
            return response.data;
        } catch (error) {
            throw new Error('Error buying stock: ' + error.message);
        }
    },

    sellStock: async (trade: StockTrade) => {
        try {
            const response = await api.sellStock(trade);
            return response.data;
        } catch (error) {
            throw new Error('Error selling stock: ' + error.message);
        }
    }
};