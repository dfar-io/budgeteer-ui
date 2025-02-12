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

@Component({
    selector: 'app-line-item',
    imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatMenuModule, CommonModule],
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
  @Output() delete = new EventEmitter<number>();

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
        amount: this.lineItem.amount,
        date: this.lineItem.date,
        cycleValue: this.lineItem.cycleValue,
        cycleDuration: this.lineItem.cycleDuration
      }
    });
    
    dialogRef.afterClosed().subscribe((result: AddEditLineItemDialogDataResult) => {
      // closed without saving
      if (result === undefined) { return; }

      this.lineItem.name = result.name;
      this.lineItem.amount = parseFloat(result.amount);

      if (result.date) {
        this.lineItem.date = result.date instanceof Date ?
          result.date.toISOString() :
          result.date;
      }

      if (result.cycleValue) {
        this.lineItem.cycleValue = parseInt(result.cycleValue);
      }

      this.lineItem.cycleDuration = result.cycleDuration;
      
      this.save.emit(this.lineItem);
    });
  }

  deleteClick() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {name: this.lineItem.name},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.delete.emit(this.lineItem.id);
      }
    });
  }

  applyClick() {
    let moneyCalc = Money.fromDecimal(this.lineItem.amount, 'USD');
    moneyCalc = moneyCalc.add(Money.fromDecimal(this.difference, 'USD'));
    this.lineItem.amount = moneyCalc.amount / 100;
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

    const dateObject = new Date(this.lineItem.date);
    if (this.lineItem.cycleDuration == 'days') {
      const newDate = dateObject.getDate() + this.lineItem.cycleValue;
      dateObject.setDate(newDate);
    }
    else {
      dateObject.setMonth(dateObject.getMonth() + this.lineItem.cycleValue);
    }
    
    this.lineItem.date = dateObject.toISOString();
    this.save.emit(this.lineItem);
  }

  isOverdue(date: string | undefined) {
    if (date === undefined) return false;

    const currentDate = new Date();
    return new Date(date) < currentDate;
  }
}
