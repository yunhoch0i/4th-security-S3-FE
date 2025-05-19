// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import ContestService from '../../../features/contest/contestService';
// import ContestCard from '../../../components/Contest/ContestCard';
// import LoadingSpinner from '../../../components/Common/LoadingSpinner';

// const ContestDetailPage = () => {
//     const router = useRouter();
//     const { contestId } = router.query;
//     const [contest, setContest] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (contestId) {
//             const fetchContestDetails = async () => {
//                 try {
//                     const contestData = await ContestService.getContestById(contestId);
//                     setContest(contestData);
//                 } catch (error) {
//                     console.error('Failed to fetch contest details:', error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchContestDetails();
//         }
//     }, [contestId]);

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (!contest) {
//         return <div>Contest not found.</div>;
//     }

//     return (
//         <div>
//             <h1>{contest.name}</h1>
//             <ContestCard contest={contest} />
//             {/* Additional contest details and participation options can be added here */}
//         </div>
//     );
// };

// export default ContestDetailPage;

import { useRouter } from "next/router";

export default function ContestDetailPage() {
  const { contestId } = useRouter().query;
  return <div>✅ /contest/{contestId}</div>;
}
