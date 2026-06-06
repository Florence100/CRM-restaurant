import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TableContext } from '@/context/TableContext';
import { fetchTables } from '@/services/api';
import { TableStatus, Tables, OrderItem, Dish } from '@/types';

/**
 * TODO: FUTURE UPDATE FOR REAL BACKEND AND REAL-TIME UPDATES
 * * Current state: 
 * We use a hybrid state. We get starter data from DummyJSON using TanStack Query 
 * and save changes locally using React Context and localStorage.
 * * Advantages of this approach:
 * 1. UI Isolation: Components (like the tables grid or order cart) only use the useTables() hook. 
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

    useEffect(() => {
        localStorage.setItem('tables', JSON.stringify(tables));
    }, [tables]);

    const { isLoading, isError } = useQuery({
        queryKey: ['initial-tables'],
        queryFn: async () => {
            const data = await fetchTables();
            setTables(data);

            return data;
        },
        enabled: tables.length === 0,
    });

    const updateTableStatus = (tableId: number, status: TableStatus, time?: string) => {
        setTables(prev => 
            prev.map((t) => 
                t.id === tableId ? { ...t, status, bookingTime: time } : t
            )
        )
    };

    const clearTable = (tableId: number) => {
        setTables(prev =>
            prev.map((t) => 
                t.id === tableId
                    ? { ...t, status: 'free', order: [], bookingTime: undefined, orderStatus: undefined }
                    : t
            )
        )
    };

    const addToOrder = (tableId: number, dish: Dish) => {
        setTables(prev => 
            prev.map((t) => {
                if (t.id !== tableId) return t;

                const existingNewItemIndex = t.order.findIndex(
                    (item) => item.id === dish.id && !item.isSentToKitchen
                );

                const updatedOrder = [...t.order];

                if (existingNewItemIndex > -1) {
                    updatedOrder[existingNewItemIndex] = {
                        ...updatedOrder[existingNewItemIndex],
                        quantity: updatedOrder[existingNewItemIndex].quantity + 1,
                    };
                } else {
                    const newItem: OrderItem = {
                        id: dish.id,
                        title: dish.title,
                        price: dish.price,
                        image: dish.image,
                        quantity: 1,
                        isSentToKitchen: false,
                        notes: '',
                    };
                    updatedOrder.push(newItem);
                }

                const newStatus = (t.status === 'free' || t.status === 'res') ? 'occ' : t.status;

                return { ...t, order: updatedOrder, status: newStatus, bookingTime: undefined };
            })
        )
    }

    const removeFromOrder = (tableId: number, dishId: number) => {
        setTables(prev => 
            prev.map((t) => {
                if (t.id !== tableId) return t;

                const existingItemIndex = t.order.findIndex(
                    (item) => item.id === dishId && !item.isSentToKitchen
                );

                if (existingItemIndex === -1) return t;

                const updatedOrder = [...t.order];
                const currentItem = updatedOrder[existingItemIndex];

                if (currentItem.quantity > 1) {
                    updatedOrder[existingItemIndex] = {
                        ...currentItem,
                        quantity: currentItem.quantity - 1,
                    };
                } else {
                    updatedOrder.splice(existingItemIndex, 1);
                }

                return { ...t, order: updatedOrder };
            })
        )
    };

    const sendToKitchen = (tableId: number) => {
        setTables(prev =>
            prev.map((t) => {
                if (t.id !== tableId) return t;

                const updatedOrder = [...t.order];

                t.order.forEach((dish) => {
                    const index = updatedOrder.findIndex(d => d === dish);

                    if (dish.isSentToKitchen) {
                        return;
                    } else {
                        const existingItemIndex = updatedOrder.findIndex(d => (d.id === dish.id) && (d.isSentToKitchen === true));

                        if (existingItemIndex > -1) {
                            updatedOrder[existingItemIndex].quantity += dish.quantity;
                            updatedOrder.splice(index, 1);
                        } else {
                            updatedOrder[index].isSentToKitchen = true;
                        }
                    }
                })

                return { ...t, order: updatedOrder };
            })
        )
    }

    return (
        <TableContext.Provider
            value={{ 
                tables,
                isLoading: tables.length === 0 && isLoading,
                isError, 
                updateTableStatus,
                clearTable,
                addToOrder,
                removeFromOrder,
                sendToKitchen
            }}
        >
            {children}
        </TableContext.Provider>
    );
}