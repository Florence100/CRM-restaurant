type LoadingMessageProps = {
    text?: string;
}

export function LoadingMessage({ text }: LoadingMessageProps) {
    return (
        <div className='flex h-64 items-center justify-center font-medium text-slate-500'>
            { text ? text : 'Loading...'}
        </div>
    );
}