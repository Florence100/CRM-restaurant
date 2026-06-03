import { createContext } from 'react';
import { Table, TableStatus, OrderItem, Dish } from '@/types';

interface TableContextType {
    tables: Table[];
    isLoading: boolean;
    isError: boolean;
    updateTableStatus: (tableId: number, status: TableStatus, time?: string) => void;
    updateOrder: (tableId: number, order: OrderItem[]) => void;
    clearTable: (tableId: number) => void;
    addToOrder: (tableId: number, dish: Dish) => void;
    removeFromOrder: (tableId: number, dishId: number) => void;
}

export const TableContext = createContext<TableContextType | undefined>(undefined);