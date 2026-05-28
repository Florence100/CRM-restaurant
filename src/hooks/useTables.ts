import { useContext } from 'react';
import { TableContext } from '@/context/TableContext';

export default function useTables () {
    const context = useContext(TableContext);

    if (!context) throw new Error();
    
    return context;
}