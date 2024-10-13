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
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.lineItem.name = result.name;
        this.lineItem.amount = parseFloat(result.amount);
        if (this.lineItem.date) {
          this.lineItem.date = result.date.toISOString();
        }
        this.save.emit(this.lineItem);
      }
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
}
