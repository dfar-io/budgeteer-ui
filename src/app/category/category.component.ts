import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LineItem } from '../line-item/line-item';
import { LineItemComponent } from '../line-item/line-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [LineItemComponent, MatButtonModule, MatIconModule],
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

  public ngOnInit(): void {
    console.log(this.difference);
    if (!this.title) {
      throw (new Error("The required input [title] was not provided"));
    }
    if (!this.lineItems) {
      throw (new Error("The required input [lineItems] was not provided"));
    }
    if (!this.emptyMessage) {
      throw (new Error("The required input [emptyMessage] was not provided"));
    }
  }

  onAdd() {
    this.add.emit();
  }

  onSave() {
    this.save.emit();
  }

  onDelete(lineItemId : number) {
    this.delete.emit(lineItemId);
  }
}
