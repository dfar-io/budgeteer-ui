export interface Category {
    name: string;
    backgroundColor: string;
    color: string;
    percentage: number;
    subcategories?: Subcategory[];
}

export interface Subcategory {
    name: string;
    amount: number;
}