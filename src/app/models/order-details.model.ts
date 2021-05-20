export interface OrderDetails {
  [id: string]: {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
  };
}
