export interface Item {
    id: string;
    name: string;
    description?: string;
    price: number;
    category: string;
    imageUrl: string;
    addedOn: string;
    modifiedOn: string;
    isAvailable: boolean;
}