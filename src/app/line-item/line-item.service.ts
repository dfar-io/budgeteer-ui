import { Injectable } from '@angular/core';
import { LineItem } from './line-item';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {
  readonly lineItemsKey = 'lineItems';

  getLineItems() : LineItem[] {
    const lineItems = localStorage.getItem(this.lineItemsKey);
    return lineItems ? JSON.parse(lineItems) : [];
  }
  saveLineItems(lineItems : LineItem[]) {
    localStorage.setItem(this.lineItemsKey, JSON.stringify(lineItems));
  }
}
