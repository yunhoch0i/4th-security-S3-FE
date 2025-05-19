// import React from 'react';
// import { useStock } from '../../hooks/useStock';
// import StockCard from '../../components/Stock/StockCard';
// import Layout from '../../components/Layout/AppLayout';

// const StockListPage = () => {
//     const { stocks, loading, error } = useStock();

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error loading stocks: {error.message}</div>;

//     return (
//         <Layout>
//             <h1>종목 리스트</h1>
//             <div>
//                 {stocks.map(stock => (
//                     <StockCard key={stock.id} stock={stock} />
//                 ))}
//             </div>
//         </Layout>
//     );
// };

// export default StockListPage;

export default function StockPage() {
  return <div>✅ /stock</div>;
}
