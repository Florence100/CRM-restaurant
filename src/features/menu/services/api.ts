import { fetchWithAuth } from '@/features/auth';

interface ApiOneResponse {
    id: number;
    name: string,
    prepTimeMinutes: number;
    image: string;
}

interface ApiAllResponse {
    recipes: Array<ApiOneResponse>;
}

export async function fetchMenu(): Promise<ApiAllResponse> {
    const res = await fetchWithAuth('/api/recipes');
    return await res.json();
}