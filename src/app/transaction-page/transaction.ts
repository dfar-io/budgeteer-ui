export interface Transaction {
    name: string;
    amount: number;
    date: string;
    lineItem: string;
    account?: string;
}