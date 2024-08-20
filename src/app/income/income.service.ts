import { Injectable } from '@angular/core';
import { Income } from './income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  getIncomes() : Income[] {
    const incomes = localStorage.getItem('incomes');
    return incomes ? JSON.parse(incomes) : null;
  }

  saveIncomes(incomes : Income[]) {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }
}
