import { fetchWithAuth } from '@/features/auth';

const API_URL = import.meta.env.VITE_API_URL;

interface ApiOneResponse {
    id: number;
    name: string,
    prepTimeMinutes: number;
    image: string;
}

type ApiAllResponse = {
    recipes: Array<ApiOneResponse>;
};

export async function fetchMenu(): Promise<ApiAllResponse> {
    const res = await fetchWithAuth(`${API_URL}/recipes`);
    return await res.json();
}