import { Component, numberAttribute, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LineItemComponent } from './line-item/line-item.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LineItemService } from './line-item/line-item.service';
import { LineItem } from './line-item/line-item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FontAwesomeModule, LineItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  incomes: LineItem[] = [];
  funds: LineItem[] = [];
  monthlies: LineItem[] = [];
  nonMonthlies: LineItem[] = [];

  faPlus = faPlus;

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
  }

  addIncome() {
    this.addLineItem(this.incomesKey, this.incomes)
  }

  addFund() {
    this.addLineItem(this.fundsKey, this.funds)
  }

  addMonthly() {
    this.addLineItem(this.monthliesKey, this.monthlies)
  }

  addPlanned() {
    this.addLineItem(this.nonMonthliesKey, this.nonMonthlies)
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
  }

  private saveLineItems(key : string, array : LineItem[]) {
    this.lineItemService.saveLineItems(key, array);
  }

  private deleteLineItem(id : number, key : string, array : LineItem[]) {
    const toDelete = array.findIndex(i => i.id === id);
    array.splice(toDelete, 1);

    this.lineItemService.saveLineItems(key, array);
  }

  // I'll need this later
  incomeSum = this.incomes.reduce((n, {amount}) => n + amount, 0);
}
