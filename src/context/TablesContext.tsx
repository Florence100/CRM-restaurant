import { createContext, useContext, ReactNode, FC } from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTables } from '@/features/tables/index';
import { Table, TableStatus, Tables, OrderItem, Dish } from '@/types';

interface TablesContextType {
    tables: Table[];
    isLoading: boolean;
    isError: boolean;
    updateTableStatus: (tableId: number, status: TableStatus, time?: string) => void;
    clearTable: (tableId: number) => void;
    addToOrder: (tableId: number, dish: Dish) => void;
    removeFromOrder: (tableId: number, dishId: number) => void;
    sendToKitchen: (tableId: number) => void;
}

const TablesContext = createContext<TablesContextType | undefined>(undefined);

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

export const TablesProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

                const hasExistingItem = t.order.some(
                    (item) => item.id === dish.id && !item.isSentToKitchen
                );

                let updatedOrder:OrderItem[];

                if (hasExistingItem) {
                    updatedOrder = t.order.map((item) => 
                        item.id === dish.id && !item.isSentToKitchen
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
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
                    updatedOrder = [...t.order, newItem];
                }

                const newStatus = (t.status === 'free' || t.status === 'res') ? 'occ' : t.status;

                return { 
                    ...t, 
                    order: updatedOrder, 
                    status: newStatus, 
                    bookingTime: undefined 
                };
            })
        )
    }

    const removeFromOrder = (tableId: number, dishId: number) => {
        setTables(prev => 
            prev.map((t) => {
                if (t.id !== tableId) return t;

                let decreased = false;

                const mappedOrder = t.order.map((item) => {
                    if(item.id === dishId && !item.isSentToKitchen && !decreased) {
                        decreased = true;
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    return item;
                })

                const updatedOrder = mappedOrder.filter((item) => item.quantity > 0);

                return { ...t, order: updatedOrder };
            })
        )
    };

    const sendToKitchen = (tableId: number) => {
        setTables(prev =>
            prev.map((t) => {
                if (t.id !== tableId) return t;

                const updatedOrder = t.order.reduce<OrderItem[]>((acc, dish) => {

                    if (dish.isSentToKitchen) {
                        acc.push(dish);
                        return acc;
                    }

                    const existingKitchenItemIndex = acc.findIndex(
                        (item) => item.id === dish.id && item.isSentToKitchen
                    );

                    if (existingKitchenItemIndex > -1) {
                        acc[existingKitchenItemIndex] = {
                            ...acc[existingKitchenItemIndex],
                            quantity: acc[existingKitchenItemIndex].quantity + dish.quantity
                        };
                    } else {
                        acc.push({
                            ...dish,
                            isSentToKitchen: true
                        });
                    }

                    return acc;
                }, []);

            return { ...t, order: updatedOrder };
            })
        )
    }

    return (
        <TablesContext.Provider
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
        </TablesContext.Provider>
    );
}

export function useTables() {
    const context = useContext(TablesContext);

    if (!context) {
        return {
            tables: [],
            isLoading: false,
            isError: false,
            updateTableStatus: () => {},
            clearTable: () => {},
            addToOrder: () => {},
            removeFromOrder: () => {},
            sendToKitchen: () => {},
        };
    }
    
    return context;
}

