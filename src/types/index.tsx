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

export const mockTables: Tables = [
  { "id": 1, "number": "1", "status": "occ", "order": [{ "id": 1, "title": "Pizza Dough", "price": 45, "quantity": 2 }, { "id": 3, "title": "Bruchetta", "price": 15, "quantity": 1 }], "notes": "Пиццу подать погорячее" },
  { "id": 2, "number": "2", "status": "res", "bookingTime": "18:00", "order": [], "notes": "" },
  { "id": 3, "number": "3", "status": "occ", "order": [{ "id": 2, "title": "Chicken Karahi", "price": 15, "quantity": 1 }, { "id": 4, "title": "Banoffee Pie", "price": 40, "quantity": 3 }], "notes": "Десерты вместе с кофе" },
  { "id": 4, "number": "4", "status": "free", "order": [], "notes": "" },
  { "id": 5, "number": "5", "status": "free", "order": [], "notes": "" },
  { "id": 6, "number": "6", "status": "occ", "order": [{ "id": 5, "title": "Chicken Thighs", "price": 10, "quantity": 2 }], "notes": "" },
  { "id": 7, "number": "7", "status": "occ", "order": [{ "id": 6, "title": "Japanese Ramen", "price": 20, "quantity": 4 }], "notes": "Приборы на 4 персоны" },
  { "id": 8, "number": "8", "status": "free", "order": [], "notes": "" },
  { "id": 9, "number": "9", "status": "free", "order": [], "notes": "" },
  { "id": 10, "number": "10", "status": "free", "order": [], "notes": "" },
  { "id": 11, "number": "11", "status": "res", "bookingTime": "19:30", "order": [], "notes": "" },
  { "id": 12, "number": "12", "status": "res", "bookingTime": "21:00", "order": [], "notes": "" },
  { "id": 13, "number": "13", "status": "free", "order": [], "notes": "" },
  { "id": 14, "number": "14", "status": "free", "order": [], "notes": "" },
  { "id": 15, "number": "15", "status": "free", "order": [], "notes": "" },
  { "id": 16, "number": "A1", "status": "res", "bookingTime": "18:30", "order": [], "notes": "" },
  { "id": 17, "number": "A2", "status": "free", "order": [], "notes": "" }
]