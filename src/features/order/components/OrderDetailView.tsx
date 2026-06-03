import { useState } from 'react';
import OrderSummary from './OrderSummary';
import AddDishControl from './AddDishControl';
import OrderTable from './OrderTable';
import { Menu } from './Menu';
import { Table } from '@/types';
import { Button } from '@/ui/Button';

type OrderDetailViewProps = {
    table: Table;
}

export function OrderDetailView({ table }: OrderDetailViewProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='flex flex-col gap-8 bg-light-gray p-6 rounded-lg'>

            { table.order.length > 0 && <OrderTable table={table} /> }

            <AddDishControl setIsMenuOpen={setIsMenuOpen} />

            { table.order.length > 0 && <OrderSummary table={table} /> }

            { isMenuOpen && 
                <div className='absolute inset-0 bg-white z-250 flex flex-col'>
                    <div className='fixed w-full p-6 pb-4 pt-4 border border-gray flex items-center bg-light-gray justify-between'>
                        <h2 className='font-bold text-2xl'>Add to table №{table.number}</h2>
                        <Button 
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Confirm
                        </Button>
                    </div>
                    <div className='p-6 pt-22'>
                        <Menu table={table} />
                    </div>
                </div>
            }
        </div>
    )
}