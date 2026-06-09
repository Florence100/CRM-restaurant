import { Tables } from '@/types/index';
import { TableCard } from './TableCard';

type TableGridProps = {
    tables: Tables
}

const DESKTOP_LAYOUT_MAP: Record<string, string> = {
    '1':  'col-start-1 row-start-1',
    '2':  'col-start-2 row-start-1',
    '3':  'col-start-3 row-start-1',
    '4':  'col-start-4 row-start-1',
    '5':  'col-start-5 row-start-1',
    'A1': 'col-start-6 row-start-1 -translate-y-6',

    '6':  'col-start-1 row-start-2 translate-x-1/2',
    '7':  'col-start-2 row-start-2 translate-x-1/2',
    '8':  'col-start-3 row-start-2 translate-x-1/2',
    '9':  'col-start-4 row-start-2 translate-x-1/2',
    '10': 'col-start-5 row-start-2 translate-x-1/2',

    '11': 'col-start-1 row-start-3',
    '12': 'col-start-2 row-start-3',
    '13': 'col-start-3 row-start-3',
    '14': 'col-start-4 row-start-3',
    '15': 'col-start-5 row-start-3',
    'A2': 'col-start-6 row-start-3 translate-y-6',
};

export function TableGrid({ tables }: TableGridProps) {
    return (
        <>
            {/* MOBILE / TABLET */}
            <div className='lg:hidden grid gap-4 max-md:grid-cols-2 grid-cols-3'>
                {tables.map((table) => (
                    <TableCard key={table.id} table={table} />
                ))}
            </div>

            {/* DESKTOP */}
            <div className='hidden lg:grid grid-cols-6 grid-rows-3 gap-y-8 lg:gap-x-10 xl:gap-x-15 2xl:gap-x-20'>
                {tables.map((table) => {
                    const positionClass = DESKTOP_LAYOUT_MAP[table.number] || '';

                    return (
                        <div key={table.id} className={positionClass}>
                            <TableCard table={table} />
                        </div>
                    );
                })}
            </div>
        </>
    )
}