import { Component, OnInit } from '@angular/core';
import { Transaction } from './transaction';
import { TransactionService } from './transaction.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { TransactionFileUploadDialogComponent } from '../transaction-file-upload-dialog/transaction-file-upload-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LineItemService } from '../line-item/line-item.service';
import { AddEditTransactionDialogDataResult } from '../add-edit-transaction-dialog/add-edit-transaction-dialog-data';
import { AddEditTransactionDialogComponent } from '../add-edit-transaction-dialog/add-edit-transaction-dialog.component';

@Component({
  selector: 'app-transaction-page',
  imports: [MatListModule, MatIconModule, MatButtonModule, MatMenuModule, CurrencyPipe, CommonModule],
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.css'
})
export class TransactionPageComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService,
              private lineItemService: LineItemService,
              private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
  }

  onAdd() {
    const randomId = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    const randomDecimal = parseFloat((Math.random() * (10000 - 1) + 1).toFixed(2));
    const result = {} as Transaction;
    const todayNoTime = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()).toISOString()

    result.id = randomId;
    result.name = 'new transaction';
    result.amount = randomDecimal;
    result.date = todayNoTime;

    this.transactions.unshift(result);
    this.transactionService.saveTransactions(this.transactions);
  }

  editClick(transactionId: number) {
    console.log(this.transactions);
    const transaction = this.transactions.find(t => t.id === transactionId);
    console.log(transaction);
    if (transaction === undefined) {
      throw new Error(`unable to find transaction with ID ${transactionId}`);
    }

    const dialogRef = this.dialog.open(AddEditTransactionDialogComponent, {
      data: {
        name: transaction.name,
        amount: transaction.amount,
        date: transaction.date
      }
    });
        
    dialogRef.afterClosed().subscribe((result: AddEditTransactionDialogDataResult) => {
      // closed without saving
      if (result === undefined) { return; }
    
      transaction.name = result.name;
      transaction.amount = parseFloat(result.amount);
      transaction.date = result.date instanceof Date ?
        result.date.toISOString() :
        result.date;
      transaction.lineItemId = result.lineItemId;

      this.transactionService.saveTransactions(this.transactions);
    });
  }

  deleteClick(transactionId: number) {
    const transaction = this.transactions.find(t => t.id === transactionId);
    if (transaction === undefined) {
      throw new Error(`unable to find transaction with ID ${transactionId}`);
    }

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {name: transaction.name},
    });
        
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const toDelete = this.transactions.findIndex(i => i.id === transactionId);
        this.transactions.splice(toDelete, 1);
        this.transactionService.saveTransactions(this.transactions);
      }
    });
  }

  onImport() {
    const dialogRef = this.dialog.open(TransactionFileUploadDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        throw new Error('Method not implemented.');
      }
    });
  }

  getLineItem(arg0: number) {
    // TODO: This makes a good case to merge into a lineItems data model
    // which we can categorize since we're separating based on line items
    // having dates
    let lineItem = this.lineItemService.getFunds().find(li => li.id === arg0);
    if (lineItem) {
      return lineItem.name;
    }

    lineItem = this.lineItemService.getPlanned().find(li => li.id === arg0);
    if (lineItem) {
      return lineItem.name;
    }
    return 'UNASSIGNED'
  }
}
