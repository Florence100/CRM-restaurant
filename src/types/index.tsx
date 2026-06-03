export type TableStatus = 'free' | 'res' | 'occ';

export interface OrderItem  {
    id: number;
    title: string;
    quantity: number;
    price: number;
    isSentToKitchen: boolean;
    image: string;
    notes?:string;
}

export interface Table {
    id: number;
    number: string;
    status: TableStatus;
    order: OrderItem[];
    orderStatus?: 'active' | 'precheck';
    bookingTime?: string;
}

export type Tables = Table[];

export interface Dish {
    id: number;
    title: string;
    price: number;
    image: string;
}