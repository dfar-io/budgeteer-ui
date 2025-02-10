import { Component, OnInit, Renderer2 } from '@angular/core';
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
  lineItems: LineItem[] = [];
  difference = 0;
  todaysDate = new Date();

  differenceBackgroundColor = '';
  differenceFontColor = '';

  constructor(private lineItemService: LineItemService,
              private transactionService: TransactionService,
              private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.lineItems = this.lineItemService.getLineItems();
    this.updateDifference();
  }

  updateDifference() {
    let transactionsMoneyCalc = new Money(0, 'USD');
    const transactions = this.transactionService.getTransactions();
    transactions.forEach(t => {
      transactionsMoneyCalc = transactionsMoneyCalc.add(Money.fromDecimal(t.amount, 'USD'));
    });

    const lineItemSum = this.generateSum(this.lineItems);
    console.log(lineItemSum);

    let moneyCalc = new Money(0, 'USD');
    moneyCalc = moneyCalc.add(Money.fromDecimal(transactionsMoneyCalc.amount / 100, 'USD'));
    moneyCalc = moneyCalc.add(Money.fromDecimal(lineItemSum, 'USD'));

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
    this.lineItems = this.sortLineItems(this.lineItems);
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
      moneyCalc = moneyCalc.subtract(Money.fromDecimal(li.amount, 'USD'));
    });
    return moneyCalc.amount / 100;
  }

  private sortLineItems(array: LineItem[]): LineItem[] {
    return array.sort((a: LineItem, b: LineItem) => {
      const aHasDate = a.date !== undefined;
      const bHasDate = b.date !== undefined;

      // If 'a' doesn't have 'date', it should come first
      if (!aHasDate && bHasDate) return -1;
      if (aHasDate && !bHasDate) return 1;

      // If both have or both don't have 'age', use the secondary property 'date'
      const aSortValue = aHasDate ? a.date : a.name;
      const bSortValue = bHasDate ? b.date : b.name;

      if (aSortValue === undefined || bSortValue === undefined) {
        throw new Error(`Encountered undefined names for line items ${aSortValue} and ${bSortValue}`);
      }

      if (aSortValue < bSortValue) {
        return -1;
      }
      if (aSortValue > bSortValue) {
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

  private getTodayWithoutTime(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }
}
