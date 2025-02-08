export interface LineItem {
    id: number;
    name: string;
    amount: number;
    date?: string;
    cycleValue?: number;
    cycleDuration?: string;
}