import { createFileRoute, Link } from '@tanstack/react-router';
import { useContext } from 'react';
import { TableContext } from '@/context/TableContext';
import { OrderDetailView } from '@/features/order';

export const Route = createFileRoute('/orders/$tableId')({
    component: OrderDetailsComponent,
})

function OrderDetailsComponent() {
    const { tableId } = Route.useParams();
    const tableContext = useContext(TableContext);

    const table = tableContext?.tables.find((t) => t.id === +tableId);

    return (
        <div className='flex flex-col gap-6'>

            <div className='flex items-center gap-4'>
                <Link to="/" className='size-[30px] block flex items-center justify-center'>
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.707031 5.35352L0.353477 5.70707L-7.62781e-05 5.35352L0.353477 4.99996L0.707031 5.35352ZM17.207 13.3535C17.207 13.6297 16.9832 13.8535 16.707 13.8535C16.4309 13.8535 16.207 13.6297 16.207 13.3535L16.707 13.3535L17.207 13.3535ZM5.70703 10.3535L5.35348 10.7071L0.353477 5.70707L0.707031 5.35352L1.06058 4.99996L6.06058 9.99996L5.70703 10.3535ZM0.707031 5.35352L0.353477 4.99996L5.35348 -3.85532e-05L5.70703 0.353515L6.06058 0.707069L1.06058 5.70707L0.707031 5.35352ZM0.707031 5.35352L0.707031 4.85352L10.707 4.85351L10.707 5.35351L10.707 5.85351L0.707031 5.85352L0.707031 5.35352ZM16.707 11.3535L17.207 11.3535L17.207 13.3535L16.707 13.3535L16.207 13.3535L16.207 11.3535L16.707 11.3535ZM10.707 5.35351L10.707 4.85351C14.2969 4.85351 17.207 7.76366 17.207 11.3535L16.707 11.3535L16.207 11.3535C16.207 8.31595 13.7446 5.85351 10.707 5.85351L10.707 5.35351Z" fill="#222222"/>
                    </svg>
                </Link>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-2xl font-bold'>Table {tableId}</h3>
                    <p className='font-semibold opacity-40'>Order details</p>
                </div>
            </div>

            { table && <OrderDetailView table={table} />}

        </div>
    )
}
