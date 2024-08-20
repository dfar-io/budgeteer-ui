import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Income } from './income';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [DecimalPipe, FontAwesomeModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit {
  @Input() income! : Income;
  @Output() delete = new EventEmitter<number>();

  faEdit = faEdit;
  faTrash = faTrash;

  public ngOnInit(): void {
    if (!this.income) {
      throw (new Error("The required input [income] was not provided"));
    }
  }

  onEdit() {
    alert('edit ');
  }

  onDelete() {
    this.delete.emit();
  }
}
