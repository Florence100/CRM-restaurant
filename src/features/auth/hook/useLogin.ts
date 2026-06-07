import { useMutation } from '@tanstack/react-query';
import { login } from '../services/api';

export function useLogin() {
    return useMutation({
        mutationFn: ({
            username,
            password,
        }: {
            username: string
            password: string
        }) => login(username, password),

        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
        },
    })
}