// Not needed since line item and this form line up perfectly
// But if we do we can use this to specify more diverse options.
// export interface AddEditDialogData {
//     id: number
//     name: string
//     amount: number
//     date?: string
//     cycleValue?: number
//     cycleDuration?: string
// }

export interface AddEditLineItemDialogDataResult {
    name: string
    amount: string
    date?: Date | string
    cycleValue?: string
    cycleDuration?: string
}