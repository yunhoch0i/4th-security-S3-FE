// import React, { useState } from 'react';
// import ContestForm from '../../components/Contest/ContestForm';
// import { createContest } from '../../features/contest/contestService';
// import { useRouter } from 'next/router';
// import { CreateContestInput } from '../../features/contest/contestTypes';

// const CreateContestPage = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const handleCreateContest = async (contestData: CreateContestInput): Promise<void> => {
//         setLoading(true);
//         setError('');

//         try {
//             await createContest(contestData);
//             router.push('/contest'); // Redirect to contest list after creation
//         } catch (err) {
//             setError('Failed to create contest. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h1>Create Contest</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <ContestForm onSubmit={handleCreateContest} loading={loading} />
//         </div>
//     );
// };

// export default CreateContestPage;

export default function ContestCreatePage() {
  return <div>✅ /contest/create</div>;
}
