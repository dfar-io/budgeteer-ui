export interface LineItem {
    id: number;
    name: string;
    amount: number;
    date?: string;
    cycleInDays?: number;
}