import { Tables } from '@/types/index';
const API_URL = 'https://dummyjson.com';

export async function fetchTables(): Promise<Tables> {
    const res = await fetch(`${API_URL}/c/79e9-4b8e-409b-929d`);
    return await res.json();
}