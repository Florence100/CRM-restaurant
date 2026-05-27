import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/orders/$tableId')({
    component: OrderDetailsComponent,
})

function OrderDetailsComponent() {
    const { tableId } = Route.useParams();

    return (
        <>
            <Link to="/">← Back</Link>
            <h3>Table {tableId}</h3>
            <p>Order details</p>
        </>
    )
}
