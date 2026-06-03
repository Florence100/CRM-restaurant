type ErrorMessageProps = {
    text?: string;
}

export function ErrorMessage({ text }: ErrorMessageProps) {
    return (
        <div className='flex h-64 items-center justify-center font-medium text-rose-700'>
            { text ? text : 'Error retrieving data. Please refresh the page.'}
        </div>
    );
}