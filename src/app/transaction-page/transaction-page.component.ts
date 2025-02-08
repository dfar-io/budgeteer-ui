import { Component, OnInit } from '@angular/core';
import { Transaction } from './transaction';
import { TransactionService } from './transaction.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { TransactionFileUploadDialogComponent } from '../transaction-file-upload-dialog/transaction-file-upload-dialog.component';

@Component({
  selector: 'app-transaction-page',
  imports: [MatListModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.css'
})
export class TransactionPageComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService,
              private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
  }

  onAdd() {    
    const result = {} as Transaction;
    result.account = 'random account';
    result.name = 'new transaction';

    this.transactions.unshift(result);
    this.transactionService.saveTransactions(this.transactions);
  }

  editClick() {
    throw new Error('Method not implemented.');
  }

  deleteClick() {
    throw new Error('Method not implemented.');
  }

  onImport() {
    const dialogRef = this.dialog.open(TransactionFileUploadDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: Error handling for malformed JSON
        const parsedObject = JSON.parse(result);
    
        // reload the current page
        window.location.reload();
      }
    });
  }
}
