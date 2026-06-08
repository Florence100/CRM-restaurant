import { Table } from '@/types/index';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { TableFilterContext } from '@/features/tables/index';

export function TableCard({ table }: { table: Table }) {
    const navigate = useNavigate();
    const status = table?.status;
    const currentFilter = useContext(TableFilterContext);

    let cardColor = '';
    let statusColor = '';
    let statusText = '';

    switch (status) {
        case 'free':
            cardColor = ' bg-white';
            statusColor = ' bg-status-free';
            statusText = 'Free';
            break;
        case 'res':
            cardColor = ' bg-card-res';
            statusColor = ' bg-status-res';
            statusText = 'Res';
            break;
        case 'occ':
            cardColor = ' bg-card-occ';
            statusColor = ' bg-status-occ';
            statusText = 'Occ';
            break;
    }

    let statusStyle = '';

    if (currentFilter !== 'all' && currentFilter !== status) {
        statusStyle = ' opacity-0 pointer-events-none';
    }

    return (
        <div className={"p-2 aspect-[1/1] rounded-lg cursor-pointer border-1 border-gray-300 hover:shadow transition relative" + cardColor + statusStyle}
            onClick={
                () => {
                    navigate({
                        to: '/orders/$tableId',
                        params: { tableId: table?.id.toString() }
                    })
                }
            }
        >
            <h3 className="text-md font-bold">{table?.number}</h3>
            <p className={`absolute shadow top-[-2px] right-[-2px] p-[2px] font-semibold min-w-[50px] text-center rounded-tr-lg rounded-bl-lg ${statusColor} ${status === 'res' ? 'text-card-occ' : ''}`}>{statusText}</p>
            <p className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 font-bold">{table?.bookingTime}</p>
        </div>
    );
}