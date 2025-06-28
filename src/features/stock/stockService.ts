// import { Stock } from '../stock/stockTypes';
// import { fetchStocks, fetchStockById } from '../../api/stock';

// export const getStocks = async (): Promise<Stock[]> => {
//     try {
//         const stocks = await fetchStocks();
//         return stocks;
//     } catch (error) {
//         console.error('Error fetching stocks:', error);
//         throw error;
//     }
// };

// export const getStockById = async (stockId: string): Promise<Stock> => {
//     try {
//         const stock = await fetchStockById(stockId);
//         return stock;
//     } catch (error) {
//         console.error(`Error fetching stock with ID ${stockId}:`, error);
//         throw error;
//     }
// };