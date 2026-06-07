type LoadingMessageProps = {
    text?: string;
    className?: string;
}

export function LoadingMessage({ text, className }: LoadingMessageProps) {
    return (
        <div 
            className={`flex items-center justify-center font-medium text-slate-500 ${className ? className : ''}`}
        >
            { text ? text : 'Loading...'}
        </div>
    );
}