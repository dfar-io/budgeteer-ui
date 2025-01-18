export interface AddEditDialogData {
    id: number
    name: string
    amount: number
    date?: string
    cycleInDays?: number
}

export interface AddEditDialogDataResult {
    name: string
    amount: string
    date?: Date | string
    cycleInDays?: string
}