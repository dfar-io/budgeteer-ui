import { Component } from '@angular/core';
import { categories } from './category';
import { CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [PercentPipe, CurrencyPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = [...categories];
}
