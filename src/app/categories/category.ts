export interface Category {
    name: string;
    backgroundColor: string;
    color: string;
    percentage: number;
    transactions?: Transaction[];
}

export interface Transaction {
    name: string;
    amount: number;
}