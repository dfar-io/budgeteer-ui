import { Injectable } from '@angular/core';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly transactionsKey = 'transactions';

  getTransactions(): Transaction[] {
    const transactions = localStorage.getItem(this.transactionsKey);
    return transactions ? JSON.parse(transactions) : [];
  }

  saveTransactions(transactions : Transaction[]) {
    localStorage.setItem(this.transactionsKey, JSON.stringify(transactions) ?? []);
  }
}
