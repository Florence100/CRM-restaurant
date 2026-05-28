import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TableContext } from '@/context/TableContext';
import { fetchTables } from '@/services/api';
import { TableStatus, Tables } from '@/types';

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tables, setTables] = useState<Tables>(() => {
        const saved = localStorage.getItem('tables');
        return saved ? JSON.parse(saved) : [];
    });

    const { isLoading, isError } = useQuery({
        queryKey: ['initial-tables'],
        queryFn: async () => {
            const data = await fetchTables();
            setTables(data);
            localStorage.setItem('tables', JSON.stringify(data));
            return data;
        },
        enabled: tables.length === 0,
    });

    const updateTableStatus = (tableId: number, status: TableStatus, time?: string) => {
        const updated = tables.map((t) =>
            t.id === tableId ? { ...t, status, bookingTime: time } : t
        );

        setTables(updated);
        localStorage.setItem('tables', JSON.stringify(updated));
    };

    return (
        <TableContext.Provider 
            value={{ 
                tables, 
                isLoading: tables.length === 0 && isLoading,
                isError, 
                updateTableStatus 
            }}>
            {children}
        </TableContext.Provider>
    );
}