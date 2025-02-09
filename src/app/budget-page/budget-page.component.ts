import { Component, OnInit, Renderer2 } from '@angular/core';
import { LineItem } from '../line-item/line-item';
import { LineItemService } from '../line-item/line-item.service';
import { Money } from 'ts-money';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LineItemComponent } from '../line-item/line-item.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-budget-page',
    imports: [CommonModule, CurrencyPipe, MatIconModule, MatListModule, LineItemComponent, MatButtonModule],
    templateUrl: './budget-page.component.html',
    styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  lineItems: LineItem[] = [];

  lineItemSum = 0;
  difference = 0;
  todaysDate = new Date();

  differenceBackgroundColor = '';
  differenceFontColor = '';

  toggleFutureIcon = 'visibility_off';

  constructor(private lineItemService: LineItemService,
              private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.lineItems = this.lineItemService.getLineItems();
    this.updateDifference();
  }

  updateDifference() {
    this.lineItemSum = this.generateSum(this.lineItems);
    let moneyCalc = new Money(0, 'USD');
    moneyCalc = moneyCalc.add(Money.fromDecimal(this.lineItemSum, 'USD'));
    this.difference = moneyCalc.amount / 100;

    if (this.difference == 0) {
      this.differenceBackgroundColor = 'green';
      this.differenceFontColor = 'white';
    } else if (this.difference < 0) {
      this.differenceBackgroundColor = 'red';
      this.differenceFontColor = 'white';
    } else {
      this.differenceBackgroundColor = 'yellow';
      this.differenceFontColor = 'black';
    }
  }

  addLineItem() {
    const newLineItem = this.createNewLineItem();
    this.lineItems.unshift(newLineItem);
    this.lineItemService.saveLineItems(this.lineItems);
    this.updateDifference();
  }

  private createNewLineItem(options?: keyof LineItem) {
    const randomId = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    const name = "New Line Item";
    const amount = 0;

    const result = {} as LineItem;
    result.id = randomId;
    result.name = name;
    result.amount = amount;
    result.date = options == 'date' ?
      this.getTodayWithoutTime().toISOString() : undefined;
    result.cycleValue = options == 'date' ?
      30 : undefined;

    return result;
  }

  saveLineItems() {
    this.lineItems = this.sortLineItems(this.lineItems, 'date');
    this.lineItemService.saveLineItems(this.lineItems);
    this.updateDifference();
  }

  deleteLineItem(id : number) {
    const toDelete = this.lineItems.findIndex(i => i.id === id);
    this.lineItems.splice(toDelete, 1);

    this.lineItemService.saveLineItems(this.lineItems);
    this.updateDifference();
  }

  private generateSum(lineItems: LineItem[]): number {
    let moneyCalc = new Money(0, 'USD');
    lineItems.forEach(li => {
      moneyCalc = moneyCalc.add(Money.fromDecimal(li.amount, 'USD'));
    });
    return moneyCalc.amount / 100;
  }

  private sortLineItems<LineItem>(array: LineItem[], property?: keyof LineItem): LineItem[] {
    // Check if the property exists on the objects in the array
    if (array.length === 0 || !property) {
      return array;
    }
  
    // Sort the array based on the property
    return array.slice().sort((a, b) => {
      // Handle sorting for properties that may be numbers or strings
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
  }

  determineCssClassByDate(date: string | undefined) : string {
    if (date === undefined) return '';

    const sevenDays = new Date();
    sevenDays.setDate(this.todaysDate.getDate() + 7);
    const isInFuture = new Date(date) >= sevenDays;

    return `${isInFuture ? 'future ' : ''}`;
  }

  toggleFutureVisibility() {
    const isHidden = this.toggleFutureIcon == 'visibility_off';
    const items = document.querySelectorAll('.future');
    items.forEach((item: Element) => {
      this.renderer.setStyle(item, 'display', isHidden ? 'flex' : 'none');
    });
    this.toggleFutureIcon = isHidden ? 'visibility' : 'visibility_off';
  }

  private getTodayWithoutTime(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }
}
