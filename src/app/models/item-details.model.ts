export interface ItemDetails {
  [id: string]: {
    addedOn: string;
    quantity: number;
    itemId: string;
    category: string;
    name: string;
    price: string;
    imageUrl: string
  };
}
