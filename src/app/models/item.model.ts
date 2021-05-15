export interface Item {
    id: string;
    name: string;
    description?: string;
    amount: number;
    category: string;
    imageUrl: string;
    addedOn: string;
    modifiedOn: string;
}