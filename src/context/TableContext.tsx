import { createContext } from 'react';
import { Table, TableStatus } from '@/types';

interface TableContextType {
    tables: Table[];
    isLoading: boolean;
    isError: boolean;
    updateTableStatus: (tableId: number, status: TableStatus, time?: string) => void;
}

export const TableContext = createContext<TableContextType | undefined>(undefined);