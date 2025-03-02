export interface Transaction {
    name: string;
    amount: number;
    date: string;
    lineItemName: string;
    account?: string;
}