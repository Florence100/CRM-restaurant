import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TableContext } from '@/context/TableContext';
import { fetchTables } from '@/services/api';
import { TableStatus, Tables } from '@/types';

/**
 * TODO: FUTURE UPDATE FOR REAL BACKEND AND REAL-TIME UPDATES
 * * Current state: 
 * We use a hybrid state. We get starter data from DummyJSON using TanStack Query 
 * and save changes locally using React Context and localStorage.
 * * Advantages of this approach:
 * 1. UI Isolation: Components (like the tables grid or shopping cart) only use the useTables() hook. 
 * They do not know where the data comes from. When we change the backend, we do not need to rewrite the UI.
 * 2. WebSockets support: In a real restaurant, different waiters use different tablets. 
 * We can easily add a WebSocket connection inside this provider. When the server sends an update, 
 * setTables() will instantly refresh the screen for everyone.
 * 3. Moving state to TanStack Query: In the future, we can remove the local useState. 
 * We can use useMutation and queryClient.invalidateQueries(['tables']) to automatically 
 * sync data between the real database and the client.
 */

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
            }}
        >
            {children}
        </TableContext.Provider>
    );
}