import useTables from '@/hooks/useTables';
import { Table } from '@/types';
import DeleteButton from '@/ui/DeleteButton';
// import CheckBox from '@/ui/CheckBox';

type OrderTableProps = {
    table: Table
}

export default function OrderTable({ table }: OrderTableProps) {
    const { updateOrder, addToOrder, removeFromOrder } = useTables();

    function deleteHandler(itemId: number) {
        const updatedOrder = table.order.filter(item => item.id !== itemId);
        updateOrder(table.id, updatedOrder);
    }

    return (
        <table className='w-full border-separate border-spacing-y-4'> 
            <thead>
                <tr>
                    {/* <th className='text-left pl-4'>
                        <CheckBox />
                    </th> */}
                    <th colSpan={2} className='font-semibold opacity-40 text-left'>Dish</th>
                    <th className='font-semibold opacity-40'>Price</th>
                    <th className='font-semibold opacity-40'>Amount</th>
                </tr>
            </thead>

            <tbody>
                {table.order.map((item) => (
                    <tr key={item.id}>

                        {/* <td className='rounded-l-sm bg-white p-4'>
                            <CheckBox />
                        </td> */}

                        <td className='rounded-l-sm bg-white p-4'>
                            <img src={item.image} alt={item.title} className='size-[30px] object-cover rounded-full' />
                        </td>

                        <td className='bg-white font-semibold'>
                            <p>{item.title}</p>
                        </td>

                        <td className='bg-white text-center'>
                            <p className='font-semibold'>{item.price}$</p>
                        </td>

                        <td className='bg-white'>
                            <div className='flex gap-3 items-center justify-center'>

                                <button 
                                    className='flex items-center justify-center rounded-full size-[30px] bg-lime-200 cursor-pointer font-semibold text-lg disabled:bg-gray-100 disabled:cursor-auto hover:not-disabled:bg-lime-300'
                                    aria-label='Decrease'
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
                                    aria-label='Decrease'
                                    disabled={item.isSentToKitchen}
                                    onClick={() => addToOrder(table.id, item)}
                                >
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.7571 10.0568V0H6.29972V10.0568H3.7571ZM0 6.29972V3.7571H10.0568V6.29972H0Z" fill="#353535"/>
                                    </svg>
                                </button>

                            </div>
                        </td>

                        <td className='bg-white'>
                            <p className='font-semibold w-[60px]'>{item.price * item.quantity}$</p>
                        </td>

                        {/* <td className='bg-white'>
                            {item.notes 
                                ? <svg className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5996 3C17.8398 3 18.9608 2.99957 19.8164 3.43555C20.5689 3.81902 21.181 4.43109 21.5645 5.18359C22.0004 6.03924 22 7.16018 22 9.40039V12.1553C22 14.395 22.0002 15.5155 21.5645 16.3711C21.181 17.1236 20.5688 17.7356 19.8164 18.1191C18.9608 18.5551 17.8398 18.5557 15.5996 18.5557H6.8584C6.59324 18.5557 6.33887 18.6611 6.15137 18.8486L3.70703 21.293C3.07709 21.9228 2.00012 21.4767 2 20.5859V9.40039C2 7.16018 1.99957 6.03924 2.43555 5.18359C2.81902 4.43109 3.43109 3.81902 4.18359 3.43555C5.03924 2.99957 6.16018 3 8.40039 3H15.5996ZM8.66699 12C8.11474 12 7.66705 12.4478 7.66699 13C7.66705 13.5522 8.11474 14 8.66699 14H12C12.5521 13.9998 12.9999 13.5521 13 13C12.9999 12.4479 12.5521 12.0002 12 12H8.66699ZM8.66699 7.55566C8.11471 7.55566 7.66699 8.00338 7.66699 8.55566C7.66705 9.1079 8.11474 9.55566 8.66699 9.55566H15.334C15.8859 9.55531 16.3339 9.10768 16.334 8.55566C16.334 8.0036 15.886 7.55602 15.334 7.55566H8.66699Z" fill="#222222"/>
                                </svg>
                                : <svg className='cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.2002 3.27271V2.77271V3.27271ZM20.3623 3.59985L20.5894 3.15438L20.5893 3.15435L20.3623 3.59985ZM21.6729 4.9104L22.1184 4.68341L22.1183 4.68335L21.6729 4.9104ZM22 8.07251H22.5H22ZM21.6729 16.301L22.1184 16.528L22.1184 16.528L21.6729 16.301ZM20.3623 17.6125L20.5893 18.0581L20.5893 18.058L20.3623 17.6125ZM17.2002 17.9397V18.4397V17.9397ZM2.76855 21.1711L3.12211 21.5247H3.12211L2.76855 21.1711ZM2 8.07251H1.5H2ZM2.32715 4.9104L1.88167 4.68335L1.88165 4.68341L2.32715 4.9104ZM3.6377 3.59985L3.4107 3.15435L3.41064 3.15438L3.6377 3.59985ZM6.7998 3.27271V2.77271V3.27271ZM5.70711 18.2326L5.35355 17.879L5.70711 18.2326ZM17.2002 3.27271V3.77271C18.0484 3.77271 18.6547 3.77314 19.1299 3.812C19.5993 3.85039 19.8967 3.92376 20.1353 4.04536L20.3623 3.59985L20.5893 3.15435C20.1862 2.94897 19.7426 2.85877 19.2114 2.81533C18.686 2.77236 18.032 2.77271 17.2002 2.77271V3.27271ZM20.3623 3.59985L20.1353 4.04533C20.6054 4.28497 20.9877 4.66726 21.2274 5.13745L21.6729 4.9104L22.1183 4.68335C21.7828 4.02509 21.2476 3.48988 20.5894 3.15438L20.3623 3.59985ZM21.6729 4.9104L21.2273 5.1374C21.3489 5.37603 21.4223 5.67345 21.4607 6.14284C21.4996 6.61805 21.5 7.22428 21.5 8.07251H22H22.5C22.5 7.24072 22.5003 6.58674 22.4574 6.06133C22.4139 5.53011 22.3237 5.08648 22.1184 4.68341L21.6729 4.9104ZM22 8.07251H21.5V13.1389H22H22.5V8.07251H22ZM22 13.1389H21.5C21.5 13.9871 21.4995 14.5934 21.4607 15.0686C21.4223 15.538 21.3489 15.8354 21.2273 16.0741L21.6729 16.301L22.1184 16.528C22.3237 16.1249 22.4139 15.6813 22.4573 15.1501C22.5003 14.6247 22.5 13.9707 22.5 13.1389H22ZM21.6729 16.301L21.2273 16.074C20.9875 16.5447 20.6053 16.9275 20.1353 17.1671L20.3623 17.6125L20.5893 18.058C21.2481 17.7223 21.783 17.1862 22.1184 16.528L21.6729 16.301ZM20.3623 17.6125L20.1353 17.167C19.8967 17.2886 19.5993 17.362 19.1299 17.4004C18.6547 17.4393 18.0484 17.4397 17.2002 17.4397V17.9397V18.4397C18.032 18.4397 18.686 18.44 19.2114 18.3971C19.7426 18.3536 20.1862 18.2634 20.5893 18.0581L20.3623 17.6125ZM17.2002 17.9397V17.4397H6.41421V17.9397V18.4397H17.2002V17.9397ZM5.70711 18.2326L5.35355 17.879L2.415 20.8176L2.76855 21.1711L3.12211 21.5247L6.06066 18.5861L5.70711 18.2326ZM2.76855 21.1711L2.415 20.8176C2.41796 20.8146 2.42857 20.8073 2.44364 20.8047C2.45598 20.8026 2.46449 20.8047 2.46932 20.8067C2.47415 20.8087 2.48166 20.8132 2.48887 20.8234C2.49768 20.8359 2.5 20.8486 2.5 20.8528H2H1.5C1.5 21.6991 2.52362 22.1232 3.12211 21.5247L2.76855 21.1711ZM2 20.8528H2.5V8.07251H2H1.5V20.8528H2ZM2 8.07251H2.5C2.5 7.22428 2.50043 6.61805 2.5393 6.14284C2.57769 5.67345 2.65106 5.37603 2.77265 5.1374L2.32715 4.9104L1.88165 4.68341C1.67627 5.08648 1.58607 5.53011 1.54263 6.06133C1.49966 6.58674 1.5 7.24072 1.5 8.07251H2ZM2.32715 4.9104L2.77262 5.13745C3.01227 4.66727 3.39456 4.28497 3.86475 4.04533L3.6377 3.59985L3.41064 3.15438C2.75238 3.48988 2.21718 4.02509 1.88167 4.68335L2.32715 4.9104ZM3.6377 3.59985L3.86469 4.04536C4.10333 3.92376 4.40074 3.85039 4.87014 3.812C5.34535 3.77314 5.95157 3.77271 6.7998 3.77271V3.27271V2.77271C5.96801 2.77271 5.31403 2.77236 4.78863 2.81533C4.2574 2.85877 3.81377 2.94897 3.4107 3.15435L3.6377 3.59985ZM6.7998 3.27271V3.77271H17.2002V3.27271V2.77271H6.7998V3.27271ZM6.41421 17.9397V17.4397C6.01639 17.4397 5.63486 17.5977 5.35355 17.879L5.70711 18.2326L6.06066 18.5861C6.15443 18.4924 6.28161 18.4397 6.41421 18.4397V17.9397Z" fill="#222222"/>
                                    <path d="M7 9L17 9" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 13L14 13" stroke="#222222" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            }
                        </td> */}

                        <td className='bg-white'>
                            <DeleteButton 
                                aria-label='delete'
                                disabled={item.isSentToKitchen}
                                onClick={() => deleteHandler(item.id)}
                            />
                        </td>

                        <td className='rounded-r-sm bg-white'>
                            <p className='text-lime-500'>{ item.isSentToKitchen ? 'Cooking' : ''}</p>
                        </td>

                    </tr>
                ))}
            </tbody>

        </table>
    )
}