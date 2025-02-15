import { Injectable } from '@angular/core';
import { LineItem } from './line-item';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class LineItemService extends DataService {
  readonly lineItemsKey = 'lineItems';

  getLineItems() : LineItem[] {
    return this.getData(this.lineItemsKey);
  }
  
  saveLineItems(lineItems : LineItem[]) {
    localStorage.setItem(this.lineItemsKey, JSON.stringify(lineItems));
  }
}
