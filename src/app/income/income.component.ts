import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Income } from './income';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CurrencyPipe, FontAwesomeModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent {
  @Input() incomes : Income[] = [];
  @Output() saveIncomesEvent = new EventEmitter<Income[]>();

  faEdit = faEdit;

  edit() {
    this.incomes.forEach(i => i.amount += 50);
    this.saveIncomesEvent.emit(this.incomes);
  }
}
