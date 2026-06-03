import { Table } from '@/types';
import { Button, ButtonTransparent } from '@/ui/Button';

type OrderSummaryProps = {
    table: Table;
}

export default function OrderSummary({ table }: OrderSummaryProps) {
    const total = table.order.reduce((acc, t) => {
        return acc += t.price * t.quantity
    }, 0)

    return (
        <div className='flex flex-col gap-2'>
            <h3 className='font-semibold'>Total</h3>
            <div className='flex justify-between p-4 border border-black rounded-sm'>
                <div className='font-semibold text-[32px]'>${total}</div>
                {
                    table.order.every(item => item.isSentToKitchen === true)
                        ? <Button>Print bill</Button>
                        : <ButtonTransparent>Send to kitchen</ButtonTransparent>
                }
            </div>
        </div>
    )
}