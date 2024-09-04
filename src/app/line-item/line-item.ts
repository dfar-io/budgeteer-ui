export interface LineItem {
    id: number;
    name: string;
    amount: number;
    paymentDay?: number;
    paymentMonth?: number;
}