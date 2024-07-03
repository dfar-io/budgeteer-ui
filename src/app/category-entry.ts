import { CategoryEntryType } from "./category-entry-type";

export interface CategoryEntry {
    type: CategoryEntryType;
    name: string;
    amount: number;
    color?: string;
}
