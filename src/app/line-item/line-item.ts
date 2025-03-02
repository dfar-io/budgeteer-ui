export interface LineItem {
    id: number;
    name: string;
    assigned: number;
    date?: string;
    cycleValue?: number;
    cycleType?: string;
    startDate?: string;
    previousAssigned?: string;
}