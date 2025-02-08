export interface AddEditDialogData {
    id: number
    name: string
    amount: number
    date?: string
    cycleValue?: number
    cycleDuration?: string
}

export interface AddEditDialogDataResult {
    name: string
    amount: string
    date?: Date | string
    cycleValue?: string
    cycleDuration?: string
}