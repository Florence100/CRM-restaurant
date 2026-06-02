import { OrderProps } from '@/types';

export default function Control({ table }: OrderProps) {
    console.log(table)
    return (
        <div className='flex items-center gap-12'>

            <div className='flex items-center gap-4'>
                <button
                    id='add-btn' 
                    className='size-[26px] bg-black text-white rounded-sm font-bold cursor-pointer'
                    onClick={() => alert('click')}
                >+</button>
                <label htmlFor='add-btn' className='font-semibold opacity-40 cursor-pointer'>Add dish</label>
            </div>

        </div>
    )
}