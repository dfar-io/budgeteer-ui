import { Component, OnInit } from '@angular/core';
import { LineItem } from '../line-item/line-item';
import { LineItemService } from '../line-item/line-item.service';
import { Money } from 'ts-money';
import { CategoryComponent } from '../category/category.component';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-budget-page',
  standalone: true,
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

  differenceBackgroundColor = '';
  differenceFontColor = '';

  readonly incomesKey = 'incomes';
  readonly fundsKey = 'funds';
  readonly plannedKey = 'planned';

  constructor(private lineItemService: LineItemService) {}

  ngOnInit() {
    this.incomes = this.lineItemService.getLineItems(this.incomesKey) ?? [];
    this.funds = this.lineItemService.getLineItems(this.fundsKey) ?? [];
    this.planned = this.lineItemService.getLineItems(this.plannedKey) ?? [];
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

  addIncome() {
    const newIncome = this.createNewLineItem();
    this.incomes.unshift(newIncome);
    this.lineItemService.saveLineItems(this.incomesKey, this.incomes);
    this.updateDifference();
  }

  addFund() {
    const newFund = this.createNewLineItem();
    this.funds.unshift(newFund);
    this.lineItemService.saveLineItems(this.fundsKey, this.funds);
    this.updateDifference();
  }

  addPlanned() {
    const newPlanned = this.createNewLineItem('date');
    this.planned.unshift(newPlanned);
    this.planned = this.sortLineItems(this.planned, 'date');
    this.lineItemService.saveLineItems(this.plannedKey, this.planned);
    this.updateDifference();
  }

  saveIncomes() {
    this.lineItemService.saveLineItems(this.incomesKey, this.incomes);
  }

  saveFunds() {
    this.lineItemService.saveLineItems(this.fundsKey, this.funds);
  }

  savePlanned() {
    this.planned = this.sortLineItems(this.planned, 'date');
    this.lineItemService.saveLineItems(this.plannedKey, this.planned);
  }

  deleteIncome(id : number) {
    this.deleteLineItem(id, this.incomesKey, this.incomes);
  }

  deleteFund(id : number) {
    this.deleteLineItem(id, this.fundsKey, this.funds);
  }

  deletePlanned(id : number) {
    this.deleteLineItem(id, this.plannedKey, this.planned);
  }

  private createNewLineItem(options?: keyof LineItem) {
    const randomDecimal = Math.random() * (10000 - 1) + 1;
    const randomId = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    const name = "New Line Item";
    const amount = parseFloat(randomDecimal.toFixed(2));

    const result = {} as LineItem;
    result.id = randomId;
    result.name = name;
    result.amount = amount;
    result.date = options == 'date' ?
      this.getTodayWithoutTime().toISOString() : undefined;

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
