type ErrorMessageProps = {
    text?: string;
    className?: string;
}

export function ErrorMessage({ text, className }: ErrorMessageProps) {
    return (
        <div 
            className={`flex items-center justify-center font-medium text-slate-500 ${className ? className : ''}`}
        >
            { text ? text : 'Error retrieving data. Please refresh the page.'}
        </div>
    );
}