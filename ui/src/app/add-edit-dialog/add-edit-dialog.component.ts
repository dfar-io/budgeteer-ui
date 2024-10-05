import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AddEditDialogData } from './add-edit-dialog-data';

@Component({
  selector: 'app-add-edit-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './add-edit-dialog.component.html',
  styleUrl: './add-edit-dialog.component.css'
})
export class AddEditDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditDialogComponent>);
  readonly data = inject<AddEditDialogData>(MAT_DIALOG_DATA);
  readonly save = model(this.data);
}
