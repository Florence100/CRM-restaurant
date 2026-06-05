type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CrossButton(props: ButtonProps) {
    return (
        <button
            className='rounded-full flex items-center justify-center size-[30px] border border-dark-gray text-dark-gray cursor-pointer hover:not-disabled:bg-[#F0F0F0] disabled:opacity-50 disabled:cursor-auto'
            {...props}
        >
            ✕
        </button>
    )
}