import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Income } from './income';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [DecimalPipe, FontAwesomeModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent {
  @Input() incomes : Income[] = [];

  faEdit = faEdit;
  faTrash = faTrash;

  onEdit(index: number) {
    //this.incomes[index].amount += 50;
    //this.saveIncomesEvent.emit(this.incomes);
    alert('edit ' + index)
  }

  onDelete(index: number) {
    //delete this.incomes[index];
    //this.onDeleteEvent.emit(this.incomes);
    alert('delete ' + index)
  }
}
