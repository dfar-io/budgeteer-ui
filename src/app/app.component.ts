import { Component, OnInit } from '@angular/core';
import { LineItemService } from './line-item/line-item.service';
import { LineItem } from './line-item/line-item';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { Money } from 'ts-money';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CategoryComponent, CurrencyPipe, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  incomes: LineItem[] = [];
  funds: LineItem[] = [];
  monthlies: LineItem[] = [];
  planned: LineItem[] = [];

  incomeSum = 0;
  fundsSum = 0;
  monthliesSum = 0;
  plannedSum = 0;
  difference = 0;

  differenceBackgroundColor = '';
  differenceFontColor = '';

  private readonly incomesKey = 'incomes';
  private readonly fundsKey = 'funds';
  private readonly monthliesKey = 'monthlies';
  private readonly plannedKey = 'plannedKey';

  constructor(private lineItemService: LineItemService) {}

  ngOnInit() {
    this.incomes = this.lineItemService.getLineItems(this.incomesKey) ?? [];
    this.funds = this.lineItemService.getLineItems(this.fundsKey) ?? [];
    this.monthlies = this.lineItemService.getLineItems(this.monthliesKey) ?? [];
    this.planned = this.lineItemService.getLineItems(this.plannedKey) ?? [];
    this.updateDifference();
  }

  updateDifference() {
    this.incomeSum = this.generateSum(this.incomes);
    this.fundsSum = this.generateSum(this.funds);
    this.monthliesSum = this.generateSum(this.monthlies);
    this.plannedSum = this.generateSum(this.planned);
    let moneyCalc = new Money(0, 'USD');
    moneyCalc = moneyCalc.add(Money.fromDecimal(this.incomeSum, 'USD'));
    moneyCalc = moneyCalc.subtract(Money.fromDecimal(this.fundsSum, 'USD'));
    moneyCalc = moneyCalc.subtract(Money.fromDecimal(this.monthliesSum, 'USD'));
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
    this.addLineItem(this.incomesKey, this.incomes);
  }

  addFund() {
    this.addLineItem(this.fundsKey, this.funds);
  }

  addMonthly() {
    this.addLineItem(this.monthliesKey, this.monthlies, 'usePaymentDay');
    this.sortMonthlies();
  }

  addPlanned() {
    this.addLineItem(this.plannedKey, this.planned, 'usePaymentMonth');
    this.sortPlanned();
  }

  saveIncomes() {
    this.saveLineItems(this.incomesKey, this.incomes);
  }

  saveFunds() {
    this.saveLineItems(this.fundsKey, this.funds);
  }

  saveMonthlies() {
    this.saveLineItems(this.monthliesKey, this.monthlies);
    this.sortMonthlies();
  }

  savePlanned() {
    this.saveLineItems(this.plannedKey, this.planned);
    this.sortPlanned();
  }

  deleteIncome(id : number) {
    this.deleteLineItem(id, this.incomesKey, this.incomes);
  }

  deleteFund(id : number) {
    this.deleteLineItem(id, this.fundsKey, this.funds);
  }

  deleteMonthly(id : number) {
    this.deleteLineItem(id, this.monthliesKey, this.monthlies);
  }

  deletePlanned(id : number) {
    this.deleteLineItem(id, this.plannedKey, this.planned);
  }

  private addLineItem(key : string, array : LineItem[], options? : string) {
    const newLineItem = this.createNewLineItem(options)
    array.push(newLineItem);
    this.lineItemService.saveLineItems(key, array);
    this.updateDifference();
  }

  private createNewLineItem(options: string | undefined) {
    const randomDecimal = Math.random() * (10000 - 1) + 1;
    const randomId = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    const name = "New Line Item";
    const amount = parseFloat(randomDecimal.toFixed(2));

    return options == 'usePaymentDay' ?
      {
        id: randomId,
        name: name,
        amount: amount,
        paymentDay: Math.floor(Math.random() * (28 - 1 + 1)) + 1
      } :
      options == 'usePaymentMonth' ?
        {
          id: randomId,
          name: name,
          amount: amount,
          paymentMonth: Math.floor(Math.random() * (12 - 1 + 1)) + 1
        } :
        {
          id: randomId,
          name: name,
          amount: amount,
        };
  }

  private saveLineItems(key : string, array : LineItem[]) {
    this.lineItemService.saveLineItems(key, array);
    this.updateDifference();
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

  private sortMonthlies() {
    this.monthlies.sort((a, b) => {
      if (a.paymentDay === undefined) return 1;
      if (b.paymentDay === undefined) return -1;
      return a.paymentDay - b.paymentDay;
    });
  }

  private sortPlanned() {
    this.planned.sort((a, b) => {
      if (a.paymentMonth === undefined) return 1;
      if (b.paymentMonth === undefined) return -1;
      return a.paymentMonth - b.paymentMonth;
    });
  }
}
