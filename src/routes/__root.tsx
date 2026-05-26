import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
        <aside>
            <nav>
                <Link to="/">Tables</Link>
                <Link to="/statistics">Statistics</Link>
            </nav>
        </aside>
        <Outlet />
        <TanStackRouterDevtools />
    </>
  ),
})