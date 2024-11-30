import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { LineItem } from '../line-item/line-item';
import { LineItemComponent } from '../line-item/line-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { Money } from 'ts-money';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDragPlaceholder,
  moveItemInArray,
  CdkDragHandle
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [LineItemComponent, MatButtonModule, MatIconModule, CommonModule, CdkDropList, CdkDrag, CdkDragPlaceholder, CdkDragHandle, DatePipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  @Input() title!: string;
  @Input() lineItems!: LineItem[];
  @Input() emptyMessage!: string;
  @Input() difference!: number;
  @Input() usePaymentDate = false;
  @Input() todaysDate!: Date;
  @Output() add = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() delete = new EventEmitter<number>();

  isVisible! : boolean
  toggleIcon = 'keyboard_arrow_right';
  sum = 0;
  isFutureVisible = false;
  toggleFutureIcon = 'visibility_off';

  constructor(private renderer: Renderer2) {}

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
    if (!this.emptyMessage) {
      throw (new Error("The required input [todaysDate] was not provided"));
    }

    this.updateSum();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lineItems, event.previousIndex, event.currentIndex);
    this.save.emit();
  }
  
  updateSum() {
    let moneyCalc = new Money(0, 'USD');
    this.lineItems.forEach(li => {
      moneyCalc = moneyCalc.add(Money.fromDecimal(li.amount, 'USD'));
    });
    this.sum = moneyCalc.amount / 100;
  }

  toggle() {
    this.isVisible = !this.isVisible;
    this.toggleIcon = this.isVisible ? 'keyboard_arrow_down' : 'keyboard_arrow_right';
  }

  onAdd() {
    this.add.emit({
      usePaymentDate: this.usePaymentDate,
    });
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

  isInFuture(date: string | undefined) {
    if (date === undefined) return false;

    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(this.todaysDate.getMonth() + 1);
    return new Date(date) >= oneMonthAhead;
  }

  toggleFuture() {
    const isHidden = this.toggleFutureIcon == 'visibility_off';
    const items = document.querySelectorAll('.future');
    items.forEach((item: Element) => {
      this.renderer.setStyle(item, 'display', isHidden ? 'flex' : 'none');
    });
    this.toggleFutureIcon = isHidden ? 'visibility' : 'visibility_off';
  }
}
