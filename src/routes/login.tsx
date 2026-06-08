import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLogin } from '@/features/auth';
import { Button } from '@/ui/Button';
import closeEyeIcon from '@/assets/icons/eye-close.svg';
import openEyeIcon from '@/assets/icons/eye-open.svg';

export const Route = createFileRoute('/login')({
    component: LoginPage,
})

function LoginPage() {
    const navigate = useNavigate();

    const loginMutation = useLogin();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');

    const [ isShowedPassword, setIsShowedPassword ] = useState(false);

    function togglePasswordVisible() {
        isShowedPassword ? setIsShowedPassword(false) : setIsShowedPassword(true);
    }

    const handleLogin = async () => {
        try {
            await loginMutation.mutateAsync({
                username,
                password,
            })

            navigate({ to: '/' });
        } catch (e) {
            setFormError('Something went wrong. Try again');
        }
    }

    return (
        <div className='w-full h-lvh bg-black flex justify-center items-center'>
            <form className='relative flex bg-white flex-col gap-4 w-[450px] max-w-full p-6 max-xl:p-4 max-sm:p-2 pb-10 rounded-xl border max-sm:p-4'>

                <div className='flex flex-col gap-8 max-sm:gap-6'>
                    <h1 className='font-bold text-xl text-center'>Login form</h1>

                    <input
                        className='w-full p-3 pl-4 pr-4 bg-light-gray border-b-2 border-gray rounded-t-sm focus:border-b-black focus:outline-hidden focus:border-b-2'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='Please, enter emilys'
                        autoFocus
                    ></input>
                
                    <div className='relative'>
                        <input
                            className='w-full p-3 pl-4 pr-12 bg-light-gray border-b-2 border-gray rounded-t-sm focus:border-b-black focus:outline-hidden focus:border-b-2'
                            type={ isShowedPassword ? 'text' : 'password' }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Please, enter emilyspass'
                        >
                        </input>
                        <button
                                type='button'
                                onClick={togglePasswordVisible}
                                aria-label={isShowedPassword ? 'Hide password' : 'Show password'}
                                className='absolute w-[25px] top-3 right-3 cursor-pointer'
                            >
                                <img
                                    src={ isShowedPassword ? openEyeIcon : closeEyeIcon }
                                    alt="Icon"
                                    onClick={togglePasswordVisible}
                                />
                        </button>
                    </div>

                    <Button
                        type='button'
                        onClick={handleLogin}
                        disabled={loginMutation.isPending}
                    >
                        Login
                    </Button>
                </div>

                <span className='absolute left-0 bottom-3 w-full text-sm text-rose-400 text-center font-semibold'>{formError}</span>

            </form>
        </div>
    )
}
