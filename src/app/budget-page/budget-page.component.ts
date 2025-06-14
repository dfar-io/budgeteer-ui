import { Component, OnInit, inject } from '@angular/core';
import { LineItem } from '../line-item/line-item';
import { LineItemService } from '../line-item/line-item.service';
import { Money } from 'ts-money';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LineItemComponent } from '../line-item/line-item.component';
import { MatButtonModule } from '@angular/material/button';
import { TransactionService } from '../transaction-page/transaction.service';

@Component({
    selector: 'app-budget-page',
    imports: [CommonModule, CurrencyPipe, MatIconModule, MatListModule, LineItemComponent, MatButtonModule],
    templateUrl: './budget-page.component.html',
    styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  private lineItemService = inject(LineItemService);
  private transactionService = inject(TransactionService);

  lineItems: LineItem[] = [];
  difference = 0;
  todaysDate = new Date();

  differenceBackgroundColor = '';
  differenceFontColor = '';

  ngOnInit() {
    this.lineItems = this.lineItemService.getLineItems();
    this.updateCurrentMonthDifference();
  }

  updateCurrentMonthDifference() {
    const previousMonthsIncomeTotal = this.transactionService.getPreviousMonthsIncomeTotal();
    const lineItemSum = this.generateSum(this.lineItems);

    let moneyCalc = new Money(0, 'USD');
    moneyCalc = moneyCalc.add(Money.fromDecimal(previousMonthsIncomeTotal, 'USD'));
    moneyCalc = moneyCalc.subtract(Money.fromDecimal(lineItemSum, 'USD'));

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
    this.updateCurrentMonthDifference();
  }

  saveLineItems() {
    this.lineItems = this.sortLineItems(this.lineItems);
    this.lineItemService.saveLineItems(this.lineItems);
    this.updateCurrentMonthDifference();
  }

  deleteLineItem(lineItem : LineItem) {
    const toDelete = this.lineItems.findIndex(i => i.name === lineItem.name);
    this.lineItems.splice(toDelete, 1);

    this.lineItemService.saveLineItems(this.lineItems);
    this.updateCurrentMonthDifference();
  }

  determineCssClassByDate(date: string | undefined) : string {
    if (date === undefined) return '';

    const sevenDays = new Date();
    sevenDays.setDate(this.todaysDate.getDate() + 7);
    const isInFuture = new Date(date) >= sevenDays;

    return `${isInFuture ? 'future ' : ''}`;
  }

  displayCurrentMonthYear() : string {
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    const month = formatter.format(this.todaysDate);
    return month + this.todaysDate.getFullYear().toString();
  }

  private generateSum(lineItems: LineItem[]): number {
    let moneyCalc = new Money(0, 'USD');
    for (const li of lineItems) {
      moneyCalc = moneyCalc.add(Money.fromDecimal(li.assigned, 'USD'));
    }
    return moneyCalc.amount / 100;
  }

  private sortLineItems(array: LineItem[]): LineItem[] {
    return array.sort((a: LineItem, b: LineItem) => {
      const aHasDate = a.date !== undefined;
      const bHasDate = b.date !== undefined;

      // If item doesn't have 'date', it should come first
      if (!aHasDate && bHasDate) return -1;
      if (aHasDate && !bHasDate) return 1;

      // use name if date doesn't exist
      const aSortValue = aHasDate ? a.date : a.name;
      const bSortValue = bHasDate ? b.date : b.name;

      if (aSortValue === undefined || bSortValue === undefined) {
        throw new Error(`Encountered undefined names for line items ${aSortValue} and ${bSortValue}`);
      }

      let returnValue = 0;
      if (aSortValue < bSortValue) {
        returnValue = -1;
      }
      if (aSortValue > bSortValue) {
        returnValue = 1;
      }
      return returnValue;
    });
  }

  private createNewLineItem(options?: keyof LineItem) {
    const name = "New Line Item";
    const assigned = 0;

    const result = {} as LineItem;
    result.name = name;
    result.assigned = assigned;
    result.date = options == 'date' ?
      this.getTodayWithoutTime().toISOString() : undefined;
    result.cycleValue = options == 'date' ?
      30 : undefined;

    return result;
  }

  private getTodayWithoutTime(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }
}
