export type AddDishControlProps = {
    setIsMenuOpen: (val: boolean) => void;
}

export default function AddDishControl({ setIsMenuOpen }: AddDishControlProps) {
    return (
        <div className='flex items-center gap-12'>

            <div className='flex items-center gap-4'>
                <button
                    id='add-btn' 
                    className='size-[26px] bg-black text-white rounded-sm font-bold cursor-pointer focus:outline-offset-3'
                    onClick={() => setIsMenuOpen(true)}
                >+</button>
                <label htmlFor='add-btn' className='font-semibold opacity-40 cursor-pointer'>Add dish</label>
            </div>

        </div>
    )
}