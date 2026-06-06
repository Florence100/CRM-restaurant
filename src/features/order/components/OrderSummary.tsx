import { useState } from 'react';
import { Table } from '@/types';
import { Button, ButtonTransparent } from '@/ui/Button';
import { useTables } from '@/context/TablesContext';
import CrossButton from '@/ui/CrossButton';
import { useNavigate } from '@tanstack/react-router';

type OrderSummaryProps = {
    table: Table;
}

export default function OrderSummary({ table }: OrderSummaryProps) {
    const { sendToKitchen, clearTable } = useTables();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    function payHandler() {
        clearTable(table.id);

        navigate({
            to: '/'
        })
    }

    const total = table.order.reduce((acc, t) => {
        return acc += t.price * t.quantity
    }, 0);

    return (
        <div className='flex flex-col gap-2'>
            <h3 className='font-semibold'>Total</h3>
            <div className='flex justify-between p-4 border border-black rounded-sm'>
                <div className='font-semibold text-[32px]'>${total}</div>
                {
                    table.order.every(item => item.isSentToKitchen === true)
                        ? (
                            <Button  className='max-w-[250px]' onClick={() => setIsModalOpen(true)}>
                                Print bill
                            </Button>
                        )
                        : (
                            <ButtonTransparent className='max-w-[250px]' onClick={() => sendToKitchen(table.id)}>
                                Send to kitchen
                            </ButtonTransparent>
                        )
                }
            </div>
            { isModalOpen && 
                <>
                    <div className='absolute w-[600px] max-w-full h-[350px] max-h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white z-250 flex flex-col rounded-lg'>
                        <div className='w-[100%] p-6 pb-4 pt-4 border-b border-gray flex items-center bg-light-gray justify-end rounded-t-lg'>
                            <CrossButton onClick={() => setIsModalOpen(false)} />
                        </div>
                        <div className='p-6 h-lvh flex flex-col justify-center items-center gap-20'>
                            <h2 className='font-bold text-2xl'>Payment method: </h2>
                            <div className='flex gap-6 w-full justify-center'>
                                <Button className='max-w-[250px]' onClick={ payHandler }>Cash</Button>
                                <Button className='max-w-[250px]' onClick={ payHandler }>Bank card</Button>
                            </div>
                        </div>
                    </div>

                    <div 
                        className='fixed bg-black h-screen w-full top-[0] left-[0] z-200 opacity-70'
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                </>
            }
        </div>
    )
}