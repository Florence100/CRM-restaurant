interface LoginResponse {
    id: number
    username: string
    firstName: string
    lastName: string
    accessToken: string
    refreshToken: string
}

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: string;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
    refreshSubscribers.forEach(cb => cb(token));
    refreshSubscribers = [];
}

async function refreshAccessToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
    });

    if (!res.ok) throw new Error('Refresh failed');

    const data: Tokens = await res.json();

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.accessToken;
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const accessToken = localStorage.getItem('accessToken');

    const makeRequest = (token: string | null) => {
        const headers = new Headers(options.headers);
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return fetch(url, { ...options, headers });
    };

    let response = await makeRequest(accessToken);

    if (response.status === 401 && accessToken) {
        if (isRefreshing) {
            return new Promise((resolve) => {
                refreshSubscribers.push(async (newToken) => {
                    resolve(await makeRequest(newToken));
                });
            });
        }

        isRefreshing = true;

        try {
            const newToken = await refreshAccessToken();
            onRefreshed(newToken);
            response = await makeRequest(newToken);
        } catch (error) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            throw new Error('Session expired');
        } finally {
            isRefreshing = false;
        }
    }

    return response;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetchWithAuth(
        '/api/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                expiresInMins: 30,
            }),
        },
    )

    if (!response.ok) {
        throw new Error('Login failed.');
    }

    return response.json();
}

export function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export async function getUser(token: string | null): Promise<User | null> {
    if (!token) {
        return null;
    }

    const response = await fetchWithAuth(
        '/api/user/me',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    if (!response.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
    }

    return response.json();
}

