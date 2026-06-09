import { fetchWithAuth } from '@/features/auth';
import { Tables } from '@/types/index';

export async function fetchTables(): Promise<Tables> {
    const res = await fetchWithAuth('/api/c/6321-1ca1-441b-b92b');
    return await res.json();
}