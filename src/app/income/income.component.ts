import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Income } from './income';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatDialog
} from '@angular/material/dialog';
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [DecimalPipe, FontAwesomeModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css',
  //for dialog
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeComponent implements OnInit {
  @Input() income! : Income;
  @Output() save = new EventEmitter<Income>();
  @Output() delete = new EventEmitter<number>();

  readonly dialog = inject(MatDialog);
  faEdit = faEdit;
  faTrash = faTrash;

  public ngOnInit(): void {
    if (!this.income) {
      throw (new Error("The required input [income] was not provided"));
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      data: {name: this.income.name, amount: this.income.amount},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.income.name = result.name;
        this.income.amount = result.amount;
        this.save.emit(this.income);
      }
    });
  }

  onDelete() {
    this.delete.emit();
  }
}
