export type TableStatus = 'free' | 'res' | 'occ';

export interface OrderItem  {
    id: number;
    title: string;
    quantity: number;
    price: number;
}

export interface Table {
    id: number;
    number: string;
    status: TableStatus;
    order: OrderItem[];
    bookingTime?: string;
    notes?: string;
}

export type Tables = Table[];