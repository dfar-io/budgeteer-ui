import { Injectable } from '@angular/core';
import { LineItem } from './line-item';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {
  getLineItems(category : string) : LineItem[] {
    const lineItems = localStorage.getItem(category);
    return lineItems ? JSON.parse(lineItems) : null;
  }

  saveLineItems(category : string, lineItems : LineItem[]) {
    localStorage.setItem(category, JSON.stringify(lineItems));
  }
}
