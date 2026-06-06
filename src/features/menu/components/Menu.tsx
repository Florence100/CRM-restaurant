import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../services/index';
import { Dish, Table } from '@/types/index';
import { ErrorMessage } from '@/ui/ErrorMessage';
import { LoadingMessage } from '@/ui/LoadingMessage';
import { useTables } from '@/context/TablesContext';

type MenuProp = {
    table: Table;
}

export function Menu({ table }: MenuProp) {
    const { addToOrder, removeFromOrder } = useTables();

    const { data: menuData, isLoading, isError } = useQuery({
        queryKey: ['menu-recipes'],
        queryFn: async () => {
            const data = await fetchMenu();

            // mapping DummyJSON data to the CRM structure
            return data.recipes.map((r) => ({
                id: r.id,
                title: r.name,
                price: Math.floor(r.prepTimeMinutes || 15), // simulate the price since it's not in the recipes
                image: r.image
            }));
        }
    });

    if (isLoading) {
        return <LoadingMessage />
    }

    if (isError) {
        return <ErrorMessage />
    }

    return (
        <div className='grid grid-cols-2 gap-4 bg-white max-sm:grid-cols-1'>

            {menuData?.map((dish: Dish) => {
                const orderItem = table.order.find(
                    (item) => item.id === dish.id && !item.isSentToKitchen
                );
                const countInCart = orderItem ? orderItem.quantity : 0;

                return (
                    <div key={dish.id} className='flex gap-4 bg-white p-3 rounded-xl border border-gray items-center justify-between shadow-sm'>
                        
                        <div className='flex items-center gap-3'>
                            <img src={dish.image} alt={dish.title} className='size-[50px] object-cover rounded-lg' />
                            <div>
                                <h4 className='font-semibold text-sm line-clamp-1'>{dish.title}</h4>
                                <p className='font-bold text-gray-500 text-sm mt-0.5'>{dish.price}$</p>
                            </div>
                        </div>

                        { countInCart > 0
                            ? (
                                <div className='flex justify-between min-w-[120px]'>
                                    <button 
                                        className='flex items-center justify-center rounded-full size-[30px] bg-lime-200 cursor-pointer font-semibold text-lg disabled:bg-gray-100 disabled:cursor-auto hover:not-disabled:bg-lime-300'
                                        aria-label='Decrease'
                                        onClick={() => removeFromOrder(table.id, dish.id)}
                                    >
                                        <svg width="10" height="3" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 2.54261V0H10.0568V2.54261H0Z" fill="#353535"/>
                                        </svg>
                                    </button>
                                    
                                    <div className='rounded-full flex items-center justify-center size-[30px] font-bold border border-gray'>{countInCart}</div>
                                    
                                    <button 
                                        className='flex items-center justify-center rounded-full size-[30px] bg-lime-200 cursor-pointer font-semibold text-lg disabled:bg-gray-100 disabled:cursor-auto hover:not-disabled:bg-lime-300' 
                                        aria-label='Decrease'
                                        onClick={() => addToOrder(table.id, dish)}
                                    >
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.7571 10.0568V0H6.29972V10.0568H3.7571ZM0 6.29972V3.7571H10.0568V6.29972H0Z" fill="#353535"/>
                                        </svg>
                                    </button>
                                </div>
                            )
                            : (
                                <button
                                    onClick={() => addToOrder(table.id, dish)}
                                    className='min-w-[120px] h-[30px] rounded-full text-xs font-bold cursor-pointer transition-all bg-gray-200 hover:bg-gray-300'
                                >
                                    {countInCart > 0 ? `Added: ${countInCart}` : 'Add'}
                                </button>
                            )
                        }
                    </div>
                );
            })}

        </div>
    )
}