import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LineItem } from './line-item';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatDialog
} from '@angular/material/dialog';
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-line-item',
  standalone: true,
  imports: [DecimalPipe, FontAwesomeModule],
  templateUrl: './line-item.component.html',
  styleUrl: './line-item.component.css',
  //for dialog
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineItemComponent implements OnInit {
  @Input() lineItem! : LineItem;
  @Output() save = new EventEmitter<LineItem>();
  @Output() delete = new EventEmitter<number>();

  readonly dialog = inject(MatDialog);
  faEdit = faEdit;
  faTrash = faTrash;

  public ngOnInit(): void {
    if (!this.lineItem) {
      throw (new Error("The required input [lineItem] was not provided"));
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      data: {name: this.lineItem.name, amount: this.lineItem.amount},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.lineItem.name = result.name;
        this.lineItem.amount = parseFloat(result.amount);
        this.save.emit(this.lineItem);
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {name: this.lineItem.name},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.delete.emit();
      }
    });
  }
}
