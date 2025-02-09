import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTransactionDialogComponent } from './add-edit-transaction-dialog.component';

describe('AddEditTransactionDialogComponent', () => {
  let component: AddEditTransactionDialogComponent;
  let fixture: ComponentFixture<AddEditTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTransactionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
