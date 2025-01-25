import { Injectable } from '@angular/core';
import { LineItem } from './line-item';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {
  readonly incomesKey = 'incomes';
  readonly fundsKey = 'funds';
  readonly plannedKey = 'planned';

  getIncomes(): LineItem[] {
    return this.getLineItems(this.incomesKey);
  }

  getFunds(): LineItem[] {
    return this.getLineItems(this.fundsKey);
  }

  getPlanned(): LineItem[] {
    return this.getLineItems(this.plannedKey);
  }

  saveIncomes(lineItems : LineItem[]) {
    this.saveLineItems(this.incomesKey, lineItems);
  }

  saveFunds(lineItems : LineItem[]) {
    this.saveLineItems(this.fundsKey, lineItems);
  }

  savePlanned(lineItems : LineItem[]) {
    this.saveLineItems(this.plannedKey, lineItems);
  }

  // TODO: Should make these private and use the above
  getLineItems(category : string) : LineItem[] {
    const lineItems = localStorage.getItem(category);
    return lineItems ? JSON.parse(lineItems) : [];
  }
  saveLineItems(category : string, lineItems : LineItem[]) {
    localStorage.setItem(category, JSON.stringify(lineItems));
  }
}
