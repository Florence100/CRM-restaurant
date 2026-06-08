import { useTables } from '@/context/TablesContext';
import { Table } from '@/types';
import { CheckIcon } from '@/ui/CheckIcon';

type OrderTableProps = {
    table: Table
}

export default function OrderTable({ table }: OrderTableProps) {
    const { addToOrder, removeFromOrder } = useTables();

    return (
        <table className='w-full border-separate border-spacing-y-4'> 
            <thead className='max-sm:hidden'>
                <tr>
                    <th colSpan={2} className='font-semibold opacity-40 text-left'>Dish</th>
                    <th className='font-semibold opacity-40'>Price</th>
                    <th className='font-semibold opacity-40'>Amount</th>
                </tr>
            </thead>

            <tbody>
                {table.order.map((item) => (
                    <tr key={`${item.id}_${item.isSentToKitchen}`}>

                        <td className='rounded-l-sm bg-white p-4 max-sm:hidden'>
                            <img src={item.image} alt={item.title} className='size-[30px] object-cover rounded-full' />
                        </td>

                        <td className='bg-white font-semibold max-sm:text-xs'>
                            <p className='p-4 max-sm:p-2'>{item.title}</p>
                        </td>

                        <td className='bg-white text-center'>
                            <p className='font-semibold p-4 max-sm:p-2'>{item.price}$</p>
                        </td>

                        <td className='bg-white'>
                            <div className='p-4 flex gap-3 items-center justify-center max-sm:gap-2 max-sm:p-2'>

                                <button 
                                    className='flex items-center justify-center rounded-full size-[30px] bg-lime-200 cursor-pointer font-semibold text-lg disabled:bg-gray-100 disabled:cursor-auto hover:not-disabled:bg-lime-300'
                                    disabled={item.isSentToKitchen}
                                    onClick={() => removeFromOrder(table.id, item.id)}
                                >
                                    <svg width="10" height="3" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 2.54261V0H10.0568V2.54261H0Z" fill="#353535"/>
                                    </svg>
                                </button>

                                <div className='rounded-full flex items-center justify-center size-[30px] font-bold border border-gray'>{item.quantity}</div>
                                
                                <button 
                                    className='flex items-center justify-center rounded-full size-[30px] bg-lime-200 cursor-pointer font-semibold text-lg disabled:bg-gray-100 disabled:cursor-auto hover:not-disabled:bg-lime-300' 
                                    aria-label='Increase'
                                    disabled={item.isSentToKitchen}
                                    onClick={() => addToOrder(table.id, item)}
                                >
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.7571 10.0568V0H6.29972V10.0568H3.7571ZM0 6.29972V3.7571H10.0568V6.29972H0Z" fill="#353535"/>
                                    </svg>
                                </button>

                            </div>
                        </td>

                        <td className='bg-white max-sm:hidden p-4'>
                            <p className='font-semibold min-w-[40px]'>{item.price * item.quantity}$</p>
                        </td>

                        <td className='rounded-r-sm bg-white p-4 max-sm:p-2'>
                            <CheckIcon fill='oklch(64.8% 0.2 131.684)' className={`${item.isSentToKitchen ? 'opacity-100' : 'opacity-30'}`} />
                        </td>

                    </tr>
                ))}
            </tbody>

        </table>
    )
}