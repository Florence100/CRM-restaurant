import { Tables } from '@/types/index';
import { TableCard } from './TableCard';

type TableGridProps = {
    tables: Tables
}

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
            <div className='hidden lg:grid grid-cols-6 grid-rows-3 gap-y-8 lg:gap-x-10 xl:gap-x-15 2xl:gap-x-20 '>

                {/* 1 row */}
                <div className='col-start-1 row-start-1'>
                    <TableCard table={tables[0]} />
                </div>

                <div className='col-start-2 row-start-1'>
                    <TableCard table={tables[1]} />
                </div>

                <div className='col-start-3 row-start-1'>
                    <TableCard table={tables[2]} />
                </div>

                <div className='col-start-4 row-start-1'>
                    <TableCard table={tables[3]} />
                </div>

                <div className='col-start-5 row-start-1'>
                    <TableCard table={tables[4]} />
                </div>

                {/* A1 */}
                <div className='col-start-6 row-start-1 -translate-y-6'>
                    <TableCard table={tables[15]} />
                </div>

                {/* 2 row */}
                <div className='col-start-1 row-start-2 translate-x-1/2'>
                    <TableCard table={tables[5]} />
                </div>

                <div className='col-start-2 row-start-2 translate-x-1/2'>
                    <TableCard table={tables[6]} />
                </div>

                <div className='col-start-3 row-start-2 translate-x-1/2'>
                    <TableCard table={tables[7]} />
                </div>

                <div className='col-start-4 row-start-2 translate-x-1/2'>
                    <TableCard table={tables[8]} />
                </div>

                <div className='col-start-5 row-start-2 translate-x-1/2'>
                    <TableCard table={tables[9]} />
                </div>

                {/* 3 row */}
                <div className='col-start-1 row-start-3'>
                    <TableCard table={tables[10]} />
                </div>

                <div className='col-start-2 row-start-3'>
                    <TableCard table={tables[11]} />
                </div>

                <div className='col-start-3 row-start-3'>
                    <TableCard table={tables[12]} />
                </div>

                <div className='col-start-4 row-start-3'>
                    <TableCard table={tables[13]} />
                </div>

                <div className='col-start-5 row-start-3'>
                    <TableCard table={tables[14]} />
                </div>

                {/* A2 */}
                <div className='col-start-6 row-start-3 translate-y-6'>
                    <TableCard table={tables[16]} />
                </div>
            </div>
        </>
    )
}