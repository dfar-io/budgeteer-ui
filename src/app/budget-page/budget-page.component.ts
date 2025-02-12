import { Component, OnInit } from '@angular/core';
import { LineItem } from '../line-item/line-item';
import { LineItemService } from '../line-item/line-item.service';
import { Money } from 'ts-money';
import { CategoryComponent } from '../category/category.component';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-budget-page',
    imports: [CommonModule, CategoryComponent, CurrencyPipe],
    templateUrl: './budget-page.component.html',
    styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit {
  incomes: LineItem[] = [];
  funds: LineItem[] = [];
  planned: LineItem[] = [];

  incomeSum = 0;
  fundsSum = 0;
  plannedSum = 0;
  difference = 0;
  todaysDate = new Date();

  differenceBackgroundColor = '';
  differenceFontColor = '';
  
  isSortedAlphabetically = false;

  constructor(private lineItemService: LineItemService) {}

  ngOnInit() {
    this.incomes = this.lineItemService.getIncomes();
    this.funds = this.lineItemService.getFunds();
    this.planned = this.lineItemService.getPlanned();
    this.updateDifference();
  }

  updateDifference() {
    this.incomeSum = this.generateSum(this.incomes);
    this.fundsSum = this.generateSum(this.funds);
    this.plannedSum = this.generateSum(this.planned);
    let moneyCalc = new Money(0, 'USD');
    moneyCalc = moneyCalc.add(Money.fromDecimal(this.incomeSum, 'USD'));
    moneyCalc = moneyCalc.subtract(Money.fromDecimal(this.fundsSum, 'USD'));
    moneyCalc = moneyCalc.subtract(Money.fromDecimal(this.plannedSum, 'USD'));
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

  addLineItem(lineItems: LineItem[], key: string) {
    const newLineItem = this.createNewLineItem();
    lineItems.unshift(newLineItem);
    this.lineItemService.saveLineItems(key, lineItems);
    this.updateDifference();
  }

  addPlanned() {
    const newPlanned = this.createNewLineItem('date');
    this.planned.unshift(newPlanned);
    this.planned = this.sortLineItems(this.planned, this.isSortedAlphabetically ? 'name' : 'date');
    this.lineItemService.savePlanned(this.planned);
    this.updateDifference();
  }

  saveIncomes() {
    this.lineItemService.saveIncomes(this.incomes);
    this.updateDifference();
  }

  saveFunds() {
    this.lineItemService.saveFunds(this.funds);
    this.updateDifference();
  }

  savePlanned() {
    this.planned = this.sortLineItems(this.planned, this.isSortedAlphabetically ? 'name' : 'date');
    this.lineItemService.saveLineItems('planned', this.planned);
    this.updateDifference();
  }

  deleteIncome(id : number) {
    this.deleteLineItem(id, 'incomes', this.incomes);
  }

  deleteFund(id : number) {
    this.deleteLineItem(id, 'funds', this.funds);
  }

  deletePlanned(id : number) {
    this.deleteLineItem(id, 'planned', this.planned);
  }

  toggleSort() {
    this.isSortedAlphabetically = !this.isSortedAlphabetically;
    this.savePlanned();
  }

  private createNewLineItem(options?: keyof LineItem) {
    const randomDecimal = parseFloat((Math.random() * (10000 - 1) + 1).toFixed(2));
    const randomId = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    const name = "New Line Item";
    const amount = randomDecimal;

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

  private deleteLineItem(id : number, key : string, array : LineItem[]) {
    const toDelete = array.findIndex(i => i.id === id);
    array.splice(toDelete, 1);

    this.lineItemService.saveLineItems(key, array);
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

  private getTodayWithoutTime(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }
}
