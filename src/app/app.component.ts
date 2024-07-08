import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IncomeComponent } from './income/income.component';
import { CategoriesComponent } from './categories/categories.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FontAwesomeModule, IncomeComponent, CategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Budget";
  incomes = [
    {
      name: 'KeyBank',
      amount: 7000
    },
    {
      name: 'Plante Moran',
      amount: 7000
    }
  ];

  categories = [
    {
      name: 'Dave',
      percentage: 0.18
    },
    {
      name: 'Em',
      percentage: 0.18
    },
    {
      name: 'Home',
      percentage: 0.31
    },
    {
      name: 'Pups',
      percentage: 0.09
    },
    {
      name: 'Groceries',
      percentage: 0.04
    },
    {
      name: 'Dining',
      percentage: 0.05
    },
    {
      name: 'Savings',
      percentage: 0.15
    },
  ];
}
