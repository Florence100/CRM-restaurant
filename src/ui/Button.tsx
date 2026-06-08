type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button 
            {...props}
            className={
                'w-full bg-black border border-black text-white p-2 pl-4 pr-4 rounded-sm min-w-[120px] font-bold cursor-pointer hover:not-disabled:bg-transparent hover:not-disabled:text-black disabled:opacity-50 max-sm:min-w-[100px] max-sm:p-2 '
                 + props?.className
            } 
        />
    )
}

export function ButtonTransparent(props: ButtonProps) {
    return (
        <button 
            {...props} 
            className={
                'w-full bg-transparent text-black border border-black p-2 pl-4 pr-4 rounded-sm min-w-[120px] font-bold cursor-pointer hover:not-disabled:bg-black hover:not-disabled:text-white max-sm:min-w-[100px] max-sm:p-2 '
                + props?.className
            }
        />
    )
}