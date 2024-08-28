import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LineItem } from '../line-item/line-item';
import { LineItemComponent } from '../line-item/line-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [LineItemComponent, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  @Input() title!: string
  @Input() lineItems!: LineItem[]
  @Input() emptyMessage!: string
  @Input() difference!: number
  @Output() add = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter<number>();

  isVisible! : boolean
  toggleIcon = 'keyboard_arrow_right';
  sum = 0;

  public ngOnInit(): void {
    if (!this.title) {
      throw (new Error("The required input [title] was not provided"));
    }
    if (!this.lineItems) {
      throw (new Error("The required input [lineItems] was not provided"));
    }
    if (!this.emptyMessage) {
      throw (new Error("The required input [emptyMessage] was not provided"));
    }

    this.updateSum();
  }
  
  updateSum() {
    this.sum = this.lineItems.reduce((n, {amount}) => n + amount, 0);
  }

  toggle() {
    this.isVisible = !this.isVisible;
    this.toggleIcon = this.isVisible ? 'keyboard_arrow_down' : 'keyboard_arrow_right';
  }

  onAdd() {
    this.add.emit();
    this.updateSum();
  }

  onSave() {
    this.save.emit();
    this.updateSum();
  }

  onDelete(lineItemId : number) {
    this.delete.emit(lineItemId);
    this.updateSum();
  }
}
