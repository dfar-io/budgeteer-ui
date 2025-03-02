import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LineItem } from './line-item';
import {
  MatDialog
} from '@angular/material/dialog';
import { AddEditLineItemDialogComponent } from '../add-edit-line-item-dialog/add-edit-line-item-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Money } from 'ts-money';
import { AddEditLineItemDialogDataResult } from '../add-edit-line-item-dialog/add-edit-line-item-dialog-data';
import { TransactionService } from '../transaction-page/transaction.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-line-item',
    imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatMenuModule, CommonModule, MatDividerModule, MatListModule],
    templateUrl: './line-item.component.html',
    styleUrl: './line-item.component.css',
    //for dialog
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineItemComponent implements OnInit {
  @Input() lineItem! : LineItem;
  @Input() difference!: number;
  @Input() usePaymentDate = false;
  @Output() save = new EventEmitter<LineItem>();
  @Output() delete = new EventEmitter<LineItem>();

  constructor(private transactionService: TransactionService) {}

  readonly dialog = inject(MatDialog);

  public ngOnInit(): void {
    if (!this.lineItem) {
      throw (new Error("The required input [lineItem] was not provided"));
    }
  }

  editClick() {
    const dialogRef = this.dialog.open(AddEditLineItemDialogComponent, {
      data: {
        name: this.lineItem.name,
        assigned: this.lineItem.assigned,
        date: this.lineItem.date,
        cycleValue: this.lineItem.cycleValue,
        cycleType: this.lineItem.cycleType
      }
    });
    
    dialogRef.afterClosed().subscribe((result: AddEditLineItemDialogDataResult) => {
      // closed without saving
      if (result === undefined) { return; }

      this.lineItem.name = result.name;
      this.lineItem.assigned = parseFloat(result.assigned);

      if (result.date) {
        this.lineItem.date = result.date instanceof Date ?
          result.date.toISOString() :
          result.date;
      }

      if (result.cycleValue) {
        this.lineItem.cycleValue = parseInt(result.cycleValue);
      }

      this.lineItem.cycleType = result.cycleType;
      
      this.save.emit(this.lineItem);
    });
  }

  deleteClick() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {name: this.lineItem.name},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.delete.emit(this.lineItem);
      }
    });
  }

  balanceClick() {
    let moneyCalc = Money.fromDecimal(this.lineItem.assigned, 'USD');
    moneyCalc = moneyCalc.add(Money.fromDecimal(this.difference, 'USD'));
    this.lineItem.assigned = moneyCalc.amount / 100;
    this.save.emit(this.lineItem);
  }

  cycleClick() {
    if (this.lineItem.date === undefined) {
      console.error("Cycle attempted with undefined date property in lineItem");
      return;
    }
    if (this.lineItem.cycleValue === undefined) {
      console.error("Cycle attempted with undefined cycleValue property in lineItem");
      return;
    }

    this.lineItem.date = this.cycleDate();
    this.save.emit(this.lineItem);
  }

  private cycleDate() : string {
    if (this.lineItem.cycleValue === undefined || this.lineItem.cycleType === undefined || this.lineItem.date === undefined) {
      throw new Error("Attempted cycle with undefined value or type.");
    }

    const dateObject = new Date(this.lineItem.date);
    switch (this.lineItem.cycleType) {
      case 'days':
        dateObject.setDate(dateObject.getDate() + this.lineItem.cycleValue);
        break;
      case 'months':
        dateObject.setMonth(dateObject.getMonth() + this.lineItem.cycleValue);
        break;
      case 'years':
        dateObject.setMonth(dateObject.getMonth() + (this.lineItem.cycleValue * 12));
        break;
      case 'weeks':
        dateObject.setDate(dateObject.getDate() + (this.lineItem.cycleValue * 7));
        break;
      default:
        throw new Error(`Encountered invalid cycle type ${this.lineItem.cycleType}`);
    }

    return dateObject.toISOString();
  }

  isOverdue(date: string | undefined) {
    if (date === undefined) return false;

    const currentDate = new Date();
    return new Date(date) < currentDate;
  }

  getTransactionTotal(lineItem: LineItem): number {
    const transactions = this.transactionService.getTransactions()
                                                .filter(t => t.lineItem === lineItem.name);

    if (transactions === undefined) { return 0; }

    return transactions.reduce((sum, t) => sum += t.amount, 0);
  }

  getRemaining(lineItem: LineItem): number {
    return this.getTransactionTotal(lineItem) + this.lineItem.assigned;
  }

  isNeutral(lineItem: LineItem) {
    return this.getRemaining(lineItem) === 0;
  }

  isNegative(lineItem: LineItem) {
    return this.getRemaining(lineItem) < 0;
  }
}
