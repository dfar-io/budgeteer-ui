export interface Transaction {
    id: number;
    date: string;
    name: string;
    amount: number;
    account: string;
    lineItemId: number;
}