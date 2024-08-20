import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IncomeComponent } from './income/income.component';
import { CategoriesComponent } from './categories/categories.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IncomeService } from './income/income.service';
import { Income } from './income/income';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FontAwesomeModule, IncomeComponent, CategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  incomes: Income[] = [];
  title = "Budgeteer";
  faPlus = faPlus;

  constructor(private incomeService: IncomeService) {}

  ngOnInit() {
    this.incomes = this.incomeService.getIncomes() ?? [];
  }

  incomeSum = this.incomes.reduce((n, {amount}) => n + amount, 0);

  addIncome() {
    const randomDecimal = Math.random() * (10000 - 1) + 1;
    const newIncome = {
      id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      name: 'New Income',
      amount: parseFloat(randomDecimal.toFixed(2))
    }

    this.incomes.push(newIncome);

    this.incomeService.saveIncomes(this.incomes);
  }
  deleteIncome(id : number) {
    const incomeToDeleteId = this.incomes.findIndex(i => i.id === id);
    this.incomes.splice(incomeToDeleteId, 1);

    this.incomeService.saveIncomes(this.incomes);
  }

  categories = [
    {
      name: 'Dave',
      percentage: 0.125,
      backgroundColor: "darkblue",
      color: "white",
      subcategories: [
        { name: "Gitpod", amount: 9.00 },
        { name: "Haircut", amount: 50 },
        { name: "Kagi", amount: 10 },
        { name: "YouTube Premium", amount: 13.99 },
        { name: "Amex Gold Renew (150,7)", amount: 12.50 },
        { name: "Gummies (65,10/2/6)", amount: 16.25 },
        { name: "Tub Filters (169.99,5)", amount: 14.17 },
        { name: "LastPass (36,3)", amount: 4 },
        { name: "Reg. CX-3 (123,7)", amount: 9.47 },
        { name: "YNAB (109,4)", amount: 10.90 },
      ]
    },
    {
      name: 'Em',
      percentage: 0.17,
      backgroundColor: "hotpink",
      color: "black",
      subcategories: [
        { name: "O Positive", amount: 34.99 },
        { name: "Peloton", amount: 44 },
        { name: "Planet Fitness", amount: 10 },
        { name: "Reg. CX-5 (227,3)", amount: 25.23 },
      ]
    },
    {
      name: 'Home',
      percentage: 0.29,
      backgroundColor: "purple",
      color: "white",
      subcategories: [
        { name: "Comcast", amount: 121 },
        { name: "Consumers", amount: 228 },
        { name: "Electric", amount: 279 },
        { name: "Phone", amount: 173.69 },
        { name: "Amazon Prime (146,4)", amount: 14.60 },
        { name: "Auto Ins. (2363,6/12)", amount: 393.84 },
        { name: "GFL Env (65.58,1/4/7/10)", amount: 21.86 },
        { name: "HOA (120,12)", amount: 20 },
        { name: "Home Ins (2566,12)", amount: 855.34 },
        { name: "Lawn Service (1114,11)", amount: 222.80 },
        { name: "Mulch (200,4)", amount: 20 },
        { name: "Pool Open (542.39,5)", amount: 49.31 },
        { name: "Pool Close (542.39,9)", amount: 180.80 },
        { name: "Prop Tax S (3880.22,7)", amount: 323.36 },
        { name: "Prop Tax W (3520,12)", amount: 586.67 },
        { name: "Sprinkler Open (230,5)", amount: 20.91 },
        { name: "Taxes (6000,4)", amount: 600 },
      ]
    },
    {
      name: 'Groceries',
      percentage: 0.055,
      backgroundColor: "teal",
      color: "white"
    },
    {
      name: 'Pups',
      percentage: 0.10,
      backgroundColor: "orange",
      color: "black",
      subcategories: [
        { name: "Greenies", amount: 70.68 },
        { name: "Daycare", amount: 560 },
        { name: "Nala Groom", amount: 140 },
        { name: "Pup Food", amount: 78.90 },
        { name: "Nala Carpro (70.69,1/4/7/10)", amount: 23.56 },
        { name: "Nala HG (122.16,7)", amount: 9.40 },
        { name: "Peach HG (104.30,4)", amount: 10.43 },
        { name: "Pup NG (295.91,6/12)", amount: 49.32 },
        { name: "Peach Bord/Flu/Hworm (167,6)", amount: 13.92 },
        { name: "Peach Health Screen (125,6*2)", amount: 5.21 },
      ]
    },
    {
      name: 'Gasoline',
      percentage: 0.03,
      backgroundColor: "gold",
      color: "black"
    },
    {
      name: 'Dining',
      percentage: 0.05,
      backgroundColor: "violet",
      color: "black"
    },
    {
      name: 'Savings',
      percentage: 0.18,
      backgroundColor: "green",
      color: "white",
      subcategories: [
        { name: "IRA", amount: 583.33 },
      ]
    },
  ];
}
