import { Tables } from '@/types/index';

const API_URL = 'https://dummyjson.com';

export async function fetchTables(): Promise<Tables> {
    const res = await fetch(`${API_URL}/c/6321-1ca1-441b-b92b`);
    return await res.json();
}