import { useEffect, useState } from 'react';
import { getContests } from '../features/contest/contestService';
import { Contest } from '../features/contest/contestTypes';

const useContest = () => {
    const [contests, setContests] = useState<Contest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const data = await getContests();
                const contestsData: Contest[] = data.map((item: any) => ({
                    ...item,
                    description: item.description ?? '',
                    startDate: item.startDate ?? '',
                    endDate: item.endDate ?? '',
                    participants: item.participants ?? [],
                }));
                setContests(contestsData);
            } catch (err) {
                setError('Failed to fetch contests');
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, []);

    return { contests, loading, error };
};

export default useContest;