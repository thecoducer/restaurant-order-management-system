import { ItemDetails } from "./item-details.model";

export interface Cart {
    items: ItemDetails;
    totalAmt: number;
}