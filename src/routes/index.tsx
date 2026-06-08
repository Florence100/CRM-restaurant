import { createFileRoute } from '@tanstack/react-router';
import { TableGrid, TableSummary } from '@/features/tables';
import { useTables } from '@/context/TablesContext';
import { useState } from 'react';
import { TableFilterContext } from '@/features/tables/index';
import { ErrorMessage } from '@/ui/ErrorMessage';

export const Route = createFileRoute('/')({
    component: HomeComponent,
})

function HomeComponent() {
    const { tables, isLoading, isError } = useTables();

    const [currentFilter, setCurrentFilter] = useState<'all' | 'free' | 'occ' | 'res'>('all');

    if (isLoading) {
        return (
            <div className='flex h-64 items-center justify-center text-slate-500 font-medium'>
                Загрузка карты зала...
            </div>
        );
    }

    if (isError) {
        return <ErrorMessage />
    }

    return (
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>Tables</h1>
            <TableFilterContext.Provider value={currentFilter}>
                <TableSummary tables={tables} setCurrentFilter={setCurrentFilter} />
                <div className='bg-light-gray p-6 pt-12 pb-12 max-xl:p-4 max-xl:pt-10 max-xl:pb-10 max-lg:pb-4 max-lg:pt-4 max-sm:p-2 rounded-lg'>
                    <TableGrid tables={tables} />
                </div>
            </TableFilterContext.Provider>
        </div>
    )
}