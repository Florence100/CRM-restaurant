import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: HomeComponent,
})

function HomeComponent() {
    return (
        <>
            <Link to="/orders/$tableId" params={{ tableId: '1' }}>Table 1</Link>
            <Link to="/orders/$tableId" params={{ tableId: '2' }}>Table 2</Link>
            <Link to="/orders/$tableId" params={{ tableId: '3' }}>Table 3</Link>
        </>
    )
}