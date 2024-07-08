import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from './category';
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
  @Input() categories : Category[] = [];
  @Output() saveCategoriesEvent = new EventEmitter<Category[]>();

  faEdit = faEdit;

  edit() {
    this.categories.forEach(i => i.percentage += 0.01);
    this.saveCategoriesEvent.emit(this.categories);
  }
}
