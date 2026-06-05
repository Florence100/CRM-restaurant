import { useState } from 'react';
import { Table } from '@/types/index';
import useTables from '@/hooks/useTables';
import { Button } from '@/ui/Button';
import { TimePickerSlots } from './TimePickerSlots';

type ReservationProps = {
    table: Table;
}

export function Reservation({table}: ReservationProps) {
    const [isBooking, setIsBooking] = useState(false);
    const { updateTableStatus, clearTable } = useTables();

    const handleBookingConfirm = (time: string) => {
        updateTableStatus(table.id, 'res', time);
        setIsBooking(false);
    };

    return (
        <div className='w-[300px] flex flex-col gap-3'>
            {table.status === 'free' && (
                !isBooking ? (
                    <Button
                        onClick={() => setIsBooking(true)}
                        className='bg-status-res border-status-res hover:not-disabled:text-status-res'
                    >
                        Book Table
                    </Button>
                ) : (
                    <TimePickerSlots 
                        onConfirm={handleBookingConfirm} 
                        onCancel={() => setIsBooking(false)} 
                    />
                )
            )}

            {table.status === 'res' && (
                <div className='flex items-center justify-between p-4 bg-card-res border border-status-res rounded-xl'>
                    <div className='flex items-center gap-3'>
                        <div>
                            <p className='font-bold text-status-res text-sm'>Reserved Table</p>
                            <p className='text-xs text-status-res font-medium'>Guest arrives at: <span className='font-bold text-sm'>{table.bookingTime}</span></p>
                        </div>
                    </div>
                    <button
                        type='button'
                        onClick={() => clearTable(table.id)}
                        className='text-xs font-bold text-status-res cursor-pointer underline decoration-2'
                    >
                        Cancel Booking
                    </button>
                </div>
            )}
        </div>
    )
}