import { Tables } from '@/types/index';
import { useContext } from 'react';
import { TableFilterContext } from '@/context/TableFilterContext';

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
        <div className='flex gap-2'>

            <div className={`flex flex-col gap-4 bg-light-gray p-6 rounded-2xl text-sm grow ${currentFilter === 'all' ? 'ring-1 ring-gray' : ''}`}>
                <h3 className='font-semibold opacity-40'>All</h3>
                <div className='flex items-center gap-6'>
                    <div className='text-3xl font-bold'>{tables.length}</div>
                    <div className='h-px grow bg-black opacity-40'></div>
                    <button 
                        className='bg-white p-4 pt-2 pb-2 cursor-pointer hover:bg-gray-200'
                        onClick={() => setCurrentFilter('all')}
                    >
                        Show
                    </button>
                </div>
            </div>

            <div className={`flex flex-col gap-4 bg-light-gray p-6 rounded-2xl text-sm grow ${currentFilter === 'free' ? 'ring-1 ring-gray' : ''}`}>
                <h3 className='font-semibold opacity-50'>Free</h3>
                <div className='flex items-center gap-6'>
                    <div className='text-3xl font-bold'>{free}</div>
                    <div className='h-px grow bg-black opacity-40'></div>
                    <button 
                        className='bg-white p-4 pt-2 pb-2 cursor-pointer hover:bg-gray-200'
                        onClick={() => setCurrentFilter('free')}
                    >
                        Show
                    </button>
                </div>
            </div>

            <div className={`flex flex-col gap-4 bg-light-gray p-6 rounded-2xl text-sm grow ${currentFilter === 'occ' ? 'ring-1 ring-gray' : ''}`}>
                <h3 className='font-semibold opacity-40'>Occupied</h3>
                <div className='flex items-center gap-6'>
                    <div className='text-3xl font-bold'>{occupied}</div>
                    <div className='h-px grow bg-black opacity-50'></div>
                    <button 
                        className='bg-white p-4 pt-2 pb-2 cursor-pointer hover:bg-gray-200'
                        onClick={() => setCurrentFilter('occ')}
                    >
                        Show
                    </button>
                </div>
            </div>

            <div className={`flex flex-col gap-4 bg-light-gray p-6 rounded-2xl text-sm grow ${currentFilter === 'res' ? 'ring-1 ring-gray' : ''}`}>
                <h3 className='font-semibold opacity-40'>Reserved</h3>
                <div className='flex items-center gap-6'>
                    <div className='text-3xl font-bold'>{reserved}</div>
                    <div className='h-px grow bg-black opacity-50'></div>
                    <button 
                        className='bg-white p-4 pt-2 pb-2 cursor-pointer hover:bg-gray-200'
                        onClick={() => setCurrentFilter('res')}
                    >
                        Show
                    </button>
                </div>
            </div>

        </div>
    )
}