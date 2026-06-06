const API_URL = 'https://dummyjson.com';

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
    const res = await fetch(`${API_URL}/recipes`);
    return await res.json();
}