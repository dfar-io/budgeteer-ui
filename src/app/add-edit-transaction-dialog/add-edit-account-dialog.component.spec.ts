import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLineItemDialogComponent } from './add-edit-account-dialog.component';

describe('AddEditLineItemDialogComponent', () => {
  let component: AddEditLineItemDialogComponent;
  let fixture: ComponentFixture<AddEditLineItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditLineItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLineItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
