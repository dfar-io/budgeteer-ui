import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { incomes } from './income';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent {
  incomes = [...incomes];
}
