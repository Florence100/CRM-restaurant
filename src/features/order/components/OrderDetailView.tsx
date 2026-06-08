import { useState } from 'react';
import OrderSummary from './OrderSummary';
import AddDishControl from './AddDishControl';
import OrderTable from './OrderTable';
import { Menu } from '../../menu/components/Menu';
import { Table } from '@/types';
import { Button } from '@/ui/Button';
import CrossButton from '@/ui/CrossButton';

type OrderDetailViewProps = {
    table: Table;
}

export function OrderDetailView({ table }: OrderDetailViewProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isDirty = !table.order.every(item => item.isSentToKitchen);

    return (
        <div className='flex flex-col gap-8 max-xl:gap-6 bg-light-gray p-6 max-xl:p-4 max-sm:p-2 rounded-lg'>

            { table.order.length > 0 && <OrderTable table={table} /> }

            <AddDishControl setIsMenuOpen={setIsMenuOpen} />

            { table.order.length > 0 && <OrderSummary table={table} /> }

            { isMenuOpen && 
                <div className='absolute w-full top-[0] left-[0] bg-white z-250 flex flex-col'>
                    <div className='fixed w-full p-6 max-xl:p-4 max-sm:p-2 pb-4 pt-4 border-b border-gray flex items-center bg-light-gray justify-between'>
                        <h2 className='font-bold text-2xl max-sm:text-xl'>Add to table №{table.number}</h2>
                        { 
                            isDirty 
                                ? <Button className='max-w-[250px] max-sm:max-w-fit' onClick={() => setIsMenuOpen(false)}>Confirm</Button>
                                : <CrossButton onClick={() => setIsMenuOpen(false)} />
                        }
                        
                    </div>
                    <div className='p-6 pt-22 max-xl:p-4 max-xl:pt-20 max-sm:p-2 max-sm:pt-16'>
                        <Menu table={table} />
                    </div>
                </div>
            }
        </div>
    )
}