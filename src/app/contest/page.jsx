// import React from 'react';
// import { useContest } from '../../hooks/useContest';
// import ContestCard from '../../components/Contest/ContestCard';
// import Layout from '../../components/Layout/AppLayout';

// const ContestIndex = () => {
//     const { contests, loading, error } = useContest();

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error loading contests: {error.message}</div>;
//     }

//     return (
//         <Layout>
//             <h1>Contest List</h1>
//             <div>
//                 {contests.map(contest => (
//                     <ContestCard key={contest.id} contest={contest} />
//                 ))}
//             </div>
//         </Layout>
//     );
// };

// export default ContestIndex;

export default function ContestPage() {
  return <div>✅ /contest</div>;
}
