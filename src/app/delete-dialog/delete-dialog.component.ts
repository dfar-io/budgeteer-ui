import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { DeleteDialogData } from './delete-dialog-data';

@Component({
    selector: 'app-delete-dialog',
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
    templateUrl: './delete-dialog.component.html',
    styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  readonly data = inject<DeleteDialogData>(MAT_DIALOG_DATA);
  readonly confirm = model(true);
}
