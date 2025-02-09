import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { buildConstants } from '../environments/version';
import { LineItemService } from './line-item/line-item.service';
import { MatDialog } from '@angular/material/dialog';
import { DataFileUploadDialogComponent } from './data-file-upload-dialog/data-file-upload-dialog.component';
import { TransactionService } from './transaction-page/transaction.service';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, MatToolbar, MatToolbarRow, MatIcon, MatIconButton, MatMenuModule, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  version = buildConstants.VERSION;
  url = buildConstants.URL;
  todaysDate = new Date();

  constructor(private lineItemService: LineItemService,
              private transactionService: TransactionService,
              private dialog: MatDialog
  ) {}

  exportJSON() {
    const incomes = this.lineItemService.getIncomes();
    const funds = this.lineItemService.getFunds();
    const planned = this.lineItemService.getPlanned();
    const transactions = this.transactionService.getTransactions();
    const data = {
      incomes: incomes,
      funds: funds,
      planned: planned,
      transactions: transactions
    };

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(data);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a link element
    const link = document.createElement('a');

    // Create a URL for the Blob and set it as the href
    const url = URL.createObjectURL(blob);
    link.href = url;

    // Set the download attribute with a file name
    link.download = 'budgeteer-data.json';

    // Trigger the click event to download the file
    link.click();

    // Release the object URL after download
    URL.revokeObjectURL(url);
  }

  importJSON() {
    const dialogRef = this.dialog.open(DataFileUploadDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: Error handling for malformed JSON
        const parsedObject = JSON.parse(result);

        this.lineItemService.saveIncomes(parsedObject.incomes);
        this.lineItemService.saveFunds(parsedObject.funds);
        this.lineItemService.savePlanned(parsedObject.planned);
        this.transactionService.saveTransactions(parsedObject.transactions);

        // reload the current page to refresh budget component
        window.location.reload();
      }
    });
  }
}
