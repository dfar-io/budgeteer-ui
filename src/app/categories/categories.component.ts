import { Component } from '@angular/core';
import { categories } from './category';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [PercentPipe, CurrencyPipe, FontAwesomeModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  faEdit = faEdit;

  categories = [...categories];

  edit() {
    alert('editing categories');
  }
}
