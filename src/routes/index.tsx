import { createFileRoute } from '@tanstack/react-router';
import { TableGrid, TableSummary } from '@/features/tables';
import useTables from '@/hooks/useTables';
import { useState } from 'react';
import {TableFilterContext} from '@/context/TableFilterContext';

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
        return (
            <div className='bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl font-medium'>
                Ошибка при получении данных о столах. Пожалуйста, обновите страницу.
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>Tables</h1>
            <TableFilterContext.Provider value={currentFilter}>
                <TableSummary tables={tables} setCurrentFilter={setCurrentFilter} />
                <div className='bg-light-gray p-6 pt-12 pb-12 rounded-lg'>
                    <TableGrid tables={tables} />
                </div>
            </TableFilterContext.Provider>
        </div>
    )
}