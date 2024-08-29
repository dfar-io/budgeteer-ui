import { Component, OnInit } from '@angular/core';
import { LineItemService } from './line-item/line-item.service';
import { LineItem } from './line-item/line-item';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CategoryComponent, CurrencyPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  incomes: LineItem[] = [];
  funds: LineItem[] = [];
  monthlies: LineItem[] = [];
  nonMonthlies: LineItem[] = [];

  incomeSum = 0;
  fundsSum = 0;
  monthliesSum = 0;
  nonMonthliesSum = 0;
  difference = 0;

  differenceBackgroundColor = '';
  differenceFontColor = '';

  private readonly incomesKey = 'incomes';
  private readonly fundsKey = 'funds';
  private readonly monthliesKey = 'monthlies';
  private readonly nonMonthliesKey = 'nonMonthlies';

  constructor(private lineItemService: LineItemService) {}

  ngOnInit() {
    this.incomes = this.lineItemService.getLineItems(this.incomesKey) ?? [];
    this.funds = this.lineItemService.getLineItems(this.fundsKey) ?? [];
    this.monthlies = this.lineItemService.getLineItems(this.monthliesKey) ?? [];
    this.nonMonthlies = this.lineItemService.getLineItems(this.nonMonthliesKey) ?? [];
    this.updateDifference();
  }

  updateDifference() {
    this.incomeSum = this.incomes.reduce((n, {amount}) => n + amount, 0);
    this.fundsSum = this.funds.reduce((n, {amount}) => n + amount, 0);
    this.monthliesSum = this.monthlies.reduce((n, {amount}) => n + amount, 0);
    this.nonMonthliesSum = this.nonMonthlies.reduce((n, {amount}) => n + amount, 0);
    this.difference = this.incomeSum - this.fundsSum - this.monthliesSum - this.nonMonthliesSum;

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
    this.addLineItem(this.monthliesKey, this.monthlies);
  }

  addPlanned() {
    this.addLineItem(this.nonMonthliesKey, this.nonMonthlies);
  }

  saveIncomes() {
    this.saveLineItems(this.incomesKey, this.incomes);
  }

  saveFunds() {
    this.saveLineItems(this.fundsKey, this.funds);
  }

  saveMonthlies() {
    this.saveLineItems(this.monthliesKey, this.monthlies);
  }

  savePlanned() {
    this.saveLineItems(this.nonMonthliesKey, this.nonMonthlies);
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
    this.deleteLineItem(id, this.nonMonthliesKey, this.nonMonthlies);
  }

  private addLineItem(key : string, array : LineItem[]) {
    const randomDecimal = Math.random() * (10000 - 1) + 1;
    const newIncome = {
      id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      name: 'New Line Item',
      amount: parseFloat(randomDecimal.toFixed(2))
    }

    array.push(newIncome);
    this.lineItemService.saveLineItems(key, array);
    this.updateDifference();
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
}
