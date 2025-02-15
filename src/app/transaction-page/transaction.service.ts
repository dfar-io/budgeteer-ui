import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { Money } from 'ts-money';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends DataService {
  readonly transactionsKey = 'transactions';

  getTransactions() : Transaction[] {
    return this.getData(this.transactionsKey);
  }

  getAllTransactionsTotal() {
    let moneyCalc = new Money(0, 'USD');
    const transactions = this.getTransactions();
    transactions.forEach(t => {
      moneyCalc = moneyCalc.add(Money.fromDecimal(t.amount, 'USD'));
    });

    return moneyCalc.amount / 100;
  }

  saveTransactions(transactions : Transaction[]) {
    localStorage.setItem(this.transactionsKey, JSON.stringify(transactions) ?? []);
  }
}
