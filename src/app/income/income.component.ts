import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { incomes } from './income';
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
  faEdit = faEdit;

  incomes = [...incomes];

  edit() {
    alert('editing incomes');
  }
}
