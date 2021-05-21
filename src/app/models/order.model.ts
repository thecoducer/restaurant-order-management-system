import { OrderDetails } from "./order-details.model";

export interface Order {
    orderId: string,
    orderedItems: OrderDetails,
    addedOn: string,
    totalAmt: string
}