import { createContext } from 'react';

type TableFilterOptions = 'all' | 'free' | 'occ' | 'res';

export const TableFilterContext = createContext<TableFilterOptions>('all');

