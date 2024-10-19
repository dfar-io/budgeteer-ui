import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { LineItem } from './line-item';
import {
  MatDialog
} from '@angular/material/dialog';
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Money } from 'ts-money';
import { AddEditDialogDataResult } from '../add-edit-dialog/add-edit-dialog-data';

@Component({
  selector: 'app-line-item',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './line-item.component.html',
  styleUrl: './line-item.component.css',
  //for dialog
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      data: {
        name: this.lineItem.name,
        amount: this.lineItem.amount,
        date: this.lineItem.date,
        cycleInDays: this.lineItem.cycleInDays
      }
    });
    
    dialogRef.afterClosed().subscribe((result: AddEditDialogDataResult) => {
      if (result === undefined) { return; }

      this.lineItem.name = result.name;
      this.lineItem.amount = parseFloat(result.amount);
      if (result.date) {
        this.lineItem.date = result.date;
      }
      if (result.cycleInDays) {
        this.lineItem.cycleInDays = parseInt(result.cycleInDays);
      }
      
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
    if (this.lineItem.cycleInDays === undefined) {
      console.error("Cycle attempted with undefined cycleInDays property in lineItem");
      return;
    }

    const dateObject = new Date(this.lineItem.date);
    const newDate = dateObject.getDate() + this.lineItem.cycleInDays;
    dateObject.setDate(newDate);
    this.lineItem.date = dateObject.toISOString();
    this.save.emit(this.lineItem);
  }
}
