import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/api';

export function useUser(token: string | null) {
    return useQuery({
        queryKey: ['me'],
        queryFn: () => getUser(token!),
        enabled: !!token,
        retry: false,
    })
}