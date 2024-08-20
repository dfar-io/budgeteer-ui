import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from './category';
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [PercentPipe, DecimalPipe, CurrencyPipe, FontAwesomeModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @Input() categories : Category[] = [];
  @Input() incomeSum = 0;
  @Output() saveCategoriesEvent = new EventEmitter<Category[]>();

  faChevronRight = faChevronRight;

  categorySubcategoriesSum(category : Category) {
    return category.subcategories === undefined ?
      0 :
      category.subcategories.reduce((n, {amount}) => n + amount, 0);
  }
}
