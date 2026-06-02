import { OrderProps } from '@/types';
import { Button, ButtonTransparent } from '@/ui/Button';

export default function Summary({ table }: OrderProps) {
    return (
        <div className='flex flex-col gap-2'>
            <h3 className='font-semibold'>Total</h3>
            <div className='flex justify-between p-4 border border-black rounded-sm'>
                <div className='font-semibold text-[32px]'>$49,94</div>
                {
                    table.order.every(item => item.isSentToKitchen === true)
                        ? <Button>Print bill</Button>
                        : <ButtonTransparent>Send to kitchen</ButtonTransparent>
                }
            </div>
        </div>
    )
}