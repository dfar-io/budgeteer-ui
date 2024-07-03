import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CategoryEntryType } from './category-entry-type';
import { Category, categories } from './category';
import { CategoryEntry } from './category-entry';
import { incomes } from './income';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  faEdit = faEdit;
  title = "Budget";

  incomes = [...incomes];
  categories = [...categories];

  fundCategoryEntries = this.categoryEntries(CategoryEntryType.Fund);
  monthlyCategoryEntries = this.categoryEntries(CategoryEntryType.Monthly);
  nonMonthlyCategoryEntries = this.categoryEntries(CategoryEntryType.NonMonthly);

  sumCategory(category: Category) {
    let sum = 0;
    category.categoryEntries.forEach(e => sum += e.amount);
    return sum;
  }

  calcDifference() {
    let incomeSum = 0;
    let categoriesSum = 0;

    this.incomes.forEach(i => incomeSum += i.amount);
    this.categories.forEach(c => c.categoryEntries.forEach(e => categoriesSum += e.amount));

    return incomeSum - categoriesSum;
  }

  edit(entry: CategoryEntry) {
    entry.amount += 50;
  }

  private categoryEntries(categoryEntryType: CategoryEntryType) {
    const result: CategoryEntry[] = [];

    this.categories.forEach(c => {
      const color = c.color;
      const categoryEntries = c.categoryEntries;
      const filteredCategoryEntries = categoryEntries.filter(ce => ce.type === categoryEntryType);
      filteredCategoryEntries.forEach(ce => result.push({...ce, color}));
    });

    return result;
  }

  
}
