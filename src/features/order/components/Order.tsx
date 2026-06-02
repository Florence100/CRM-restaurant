import { OrderProps } from '@/types';
import Summary from './Summary';
import Control from './Control';
import OrderTable from './OrderTable';

export function Order({ table }: OrderProps) {
    return (
        <div className='flex flex-col gap-8 bg-light-gray p-6 rounded-lg'>

            {
                table.order.length > 0 && <OrderTable table={table} />
            }

            <Control table={table} />

            {
                table.order.length > 0 && <Summary table={table} />
            }

        </div>
    )
}