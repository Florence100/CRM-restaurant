import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TablesProvider } from '@/context/TablesContext';
import './index.css';

const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>

        <QueryClientProvider client={queryClient}>

            <TablesProvider>
                <RouterProvider router={router} />
            </TablesProvider>

            <ReactQueryDevtools initialIsOpen={false} />

        </QueryClientProvider>

    </React.StrictMode>,
)
