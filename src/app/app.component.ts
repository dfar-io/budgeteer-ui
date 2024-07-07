import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { IncomeComponent } from './income/income.component';
import { CategoriesComponent } from './categories/categories.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, IncomeComponent, CategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  faEdit = faEdit;
  title = "Budget";

  calcDifference() {
    let incomeSum = 0;
    let categoriesSum = 0;

    return incomeSum - categoriesSum;
  }
}
