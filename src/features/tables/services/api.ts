import { fetchWithAuth } from '@/features/auth';
import { Tables } from '@/types/index';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTables(): Promise<Tables> {
    const res = await fetchWithAuth(`${API_URL}/c/6321-1ca1-441b-b92b`);
    return await res.json();
}