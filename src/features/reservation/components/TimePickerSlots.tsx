import { useState } from 'react';
import { ButtonTransparent, Button } from '@/ui/Button';

interface TimePickerSlotsProps {
    onConfirm: (time: string) => void;
    onCancel: () => void;
}

export function TimePickerSlots({ onConfirm, onCancel }: TimePickerSlotsProps) {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const generateTimeSlots = (): string[] => {
        const slots: string[] = [];
        const now = new Date();
        
        const minutes = now.getMinutes();
        if (minutes > 0 && minutes <= 30) {
            now.setMinutes(30, 0, 0);
        } else if (minutes > 30) {
            now.setHours(now.getHours() + 1, 0, 0, 0);
        } else {
            now.setMinutes(0, 0, 0);
        }

        for (let i = 0; i < 12; i++) {
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            slots.push(`${hh}:${mm}`);
            now.setMinutes(now.getMinutes() + 30);
        }

        return slots;
    };

    const slots = generateTimeSlots();

    return (
        <div className='absolute flex flex-col gap-4 p-4 bg-white rounded-xl border border-gray z-200 max-md:w-[calc(100%-16px)] max-md:p-2'>
            <h3 className='font-bold text-sm opacity-50 uppercase tracking-wider text-center'>
                Select Booking Time
            </h3>
            
            <div className='grid grid-cols-4 gap-2'>
                {slots.map((time) => (
                    <button
                        key={time}
                        type='button'
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer border text-center ${
                            selectedTime === time
                                ? 'bg-status-res border-status-res text-white shadow-sm'
                                : 'bg-[#F9F9F9] border-transparent text-dark-gray hover:bg-[#F0F0F0]'
                        }`}
                    >
                        {time}
                    </button>
                ))}
            </div>

            <div className='flex gap-2'>
                <ButtonTransparent
                    onClick={onCancel}
                    className='border-status-res text-status-res hover:not-disabled:bg-status-res '
                >
                    Cancel
                </ButtonTransparent>
                <Button
                    disabled={!selectedTime}
                    className='bg-status-res border-status-res hover:not-disabled:text-status-res'
                    onClick={() => selectedTime && onConfirm(selectedTime)}
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
}