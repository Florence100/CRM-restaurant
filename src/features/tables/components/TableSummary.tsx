import { Tables } from '@/types/index';
import { useContext } from 'react';
import { TableFilterContext } from '@/features/tables/index';

type TableGridProps = {
    tables: Tables,
    setCurrentFilter: React.Dispatch<React.SetStateAction<'all' | 'free' | 'occ' | 'res'>>
}

export function TableSummary({ tables, setCurrentFilter }: TableGridProps) {
    const currentFilter = useContext(TableFilterContext);

    const free = tables.filter(t => t.status === 'free').length;
    const occupied = tables.filter(t => t.status === 'occ').length;
    const reserved = tables.filter(t => t.status === 'res').length;

    return (
        <div className='flex gap-2 max-sm:grid max-sm:grid-cols-2'>

            <div className={`flex flex-col gap-4 bg-light-gray p-6 max-xl:p-4 max-sm:p-2 rounded-2xl text-sm grow ${currentFilter === 'all' ? 'ring-1 ring-gray' : ''}`}>
                <h3 className='font-semibold opacity-40'>All</h3>
                <div className='flex items-center gap-6 max-lg:gap-2'>
                    <div className='text-3xl font-bold max-lg:text-2xl'>{tables.length}</div>
                    <div className='h-px grow bg-black opacity-40'></div>
                    <button 
                        className='bg-white p-4 pt-2 pb-2 max-lg:p-2 max-lg:pt-1 max-lg:pb-1 cursor-pointer hover:bg-gray-200'
                        onClick={() => setCurrentFilter('all')}
                    >
                        Show
                    </button>
                </div>
            </div>

            <div className={`flex flex-col gap-4 bg-light-gray p-6 max-xl:p-4 max-sm:p-2 rounded-2xl text-sm grow ${currentFilter === 'free' ? 'ring-1 ring-gray' : ''}`}>
                <h3 className='font-semibold opacity-50'>Free</h3>
                <div className='flex items-center gap-6 max-lg:gap-2'>
                    <div className='text-3xl font-bold max-lg:text-2xl'>{free}</div>
                    <div className='h-px grow bg-black opacity-40'></div>
                    <button 
                        className='bg-white p-4 pt-2 pb-2 max-lg:p-2 max-lg:pt-1 max-lg:pb-1 cursor-pointer hover:bg-gray-200'
                        onClick={() => setCurrentFilter('free')}
                    >
                        Show
                    </button>
                </div>
            </div>

            <div className={`flex flex-col gap-4 bg-light-gray p-6 max-xl:p-4 max-sm:p-2 rounded-2xl text-sm grow ${currentFilter === 'occ' ? 'ring-1 ring-gray' : ''}`}>
                <h3 className='font-semibold opacity-40'>Occupied</h3>
                <div className='flex items-center gap-6 max-lg:gap-2'>
                    <div className='text-3xl font-bold max-lg:text-2xl'>{occupied}</div>
                    <div className='h-px grow bg-black opacity-50'></div>
                    <button 
                        className='bg-white p-4 pt-2 pb-2 max-lg:p-2 max-lg:pt-1 max-lg:pb-1 cursor-pointer hover:bg-gray-200'
                        onClick={() => setCurrentFilter('occ')}
                    >
                        Show
                    </button>
                </div>
            </div>

            <div className={`flex flex-col gap-4 bg-light-gray p-6 max-xl:p-4 max-sm:p-2 rounded-2xl text-sm grow ${currentFilter === 'res' ? 'ring-1 ring-gray' : ''}`}>
                <h3 className='font-semibold opacity-40'>Reserved</h3>
                <div className='flex items-center gap-6 max-lg:gap-2'>
                    <div className='text-3xl font-bold max-lg:text-2xl'>{reserved}</div>
                    <div className='h-px grow bg-black opacity-50'></div>
                    <button 
                        className='bg-white p-4 pt-2 pb-2 max-lg:p-2 max-lg:pt-1 max-lg:pb-1 cursor-pointer hover:bg-gray-200'
                        onClick={() => setCurrentFilter('res')}
                    >
                        Show
                    </button>
                </div>
            </div>

        </div>
    )
}