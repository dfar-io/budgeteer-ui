import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { LineItem } from '../line-item/line-item';

@Component({
    selector: 'app-add-edit-dialog',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatDatepickerModule,
        MatSelectModule
    ],
    providers: [provideNativeDateAdapter()],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add-edit-line-item-dialog.component.html',
    styleUrl: './add-edit-line-item-dialog.component.css'
})

export class AddEditLineItemDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditLineItemDialogComponent>);
  readonly data = inject<LineItem>(MAT_DIALOG_DATA);
  readonly save = model(this.data);

  availableDurations: string[] = ['months', 'days'];
}
