import { createFileRoute } from '@tanstack/react-router';
import { TableGrid } from '@/features/tables-map';
import useTables from '@/hooks/useTables';

export const Route = createFileRoute('/')({
    component: HomeComponent,
})

function HomeComponent() {
    const { tables, isLoading, isError } = useTables();

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center text-slate-500 font-medium">
                Загрузка карты зала...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl font-medium">
                Ошибка при получении данных о столах. Пожалуйста, обновите страницу.
            </div>
        );
    }

    return (
        <div className='bg-light-gray p-6 pt-12 pb-12 rounded-lg'>
            <TableGrid tables={tables} />
        </div>
    )
}