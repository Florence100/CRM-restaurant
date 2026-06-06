import { createContext } from 'react';
import { Table, TableStatus, Dish } from '@/types';

interface TableContextType {
    tables: Table[];
    isLoading: boolean;
    isError: boolean;
    updateTableStatus: (tableId: number, status: TableStatus, time?: string) => void;
    clearTable: (tableId: number) => void;
    addToOrder: (tableId: number, dish: Dish) => void;
    removeFromOrder: (tableId: number, dishId: number) => void;
    sendToKitchen: (tableId: number) => void;
}

export const TableContext = createContext<TableContextType | undefined>(undefined);