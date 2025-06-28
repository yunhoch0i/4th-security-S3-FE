// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import StockDetailInfo from '../../components/Stock/StockDetailInfo';
// import { fetchStockDetails } from './../../api/stock';
// import { StockDetail } from '../../features/stock/stockTypes';


// const StockDetailPage = () => {
//     const router = useRouter();
//     const { stockId } = router.query;
//     const [stockDetails, setStockDetails] = useState<StockDetail | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (stockId) {
//             const getStockDetails = async () => {
//                 try {
//                     const data = await fetchStockDetails(stockId);
//                     setStockDetails(data);
//                 } catch (err) {
//                     setError(err.message);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             getStockDetails();
//         }
//     }, [stockId]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h1>Stock Details</h1>
//             {stockDetails && <StockDetailInfo stock={stockDetails} />}
//         </div>
//     );
// };

// export default StockDetailPage;