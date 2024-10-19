export interface AddEditDialogData {
    id: number
    name: string
    amount: number
    date?: Date
    cycleInDays?: number
}

export interface AddEditDialogDataResult {
    name: string
    amount: string
    date?: string
    cycleInDays?: string
}