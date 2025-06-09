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
import { Transaction } from '../transaction-page/transaction';
import { LineItemService } from '../line-item/line-item.service';

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
    templateUrl: './add-edit-transaction-dialog.component.html',
    styleUrl: './add-edit-transaction-dialog.component.css'
})

export class AddEditTransactionDialogComponent {
  private lineItemService = inject(LineItemService);

  readonly dialogRef = inject(MatDialogRef<AddEditTransactionDialogComponent>);
  readonly data = inject<Transaction>(MAT_DIALOG_DATA);
  readonly save = model(this.data);

  lineItemNames: string[] = [
    'Income',
    ...this.lineItemService.getLineItems().map(li => li.name)
  ];
}
