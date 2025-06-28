import { useEffect, useState } from 'react';
import { userService } from '../features/user/userService';
import { User } from '../features/user/userTypes';

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await userService.getCurrentUser();
                setUser(fetchedUser);
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};