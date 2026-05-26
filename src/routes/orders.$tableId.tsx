import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orders/$tableId')({
    component: OrderDetailsComponent,
})

function OrderDetailsComponent() {
    const { tableId } = Route.useParams();

    return (
        <>
            <h3>Order for table №{tableId}</h3>
        </>
    )
}
