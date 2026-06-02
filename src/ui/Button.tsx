type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button 
            {...props}  
            className='bg-black border border-black text-white p-2 pl-4 pr-4 rounded-sm min-w-[120px] font-bold cursor-pointer hover:bg-transparent hover:text-black' 
        />
    )
}

export function ButtonTransparent(props: ButtonProps) {
    return (
        <button 
            {...props} 
            className='bg-transparent text-black border border-black p-2 pl-4 pr-4 rounded-sm min-w-[120px] font-bold cursor-pointer hover:bg-black hover:text-white'
        />
    )
}