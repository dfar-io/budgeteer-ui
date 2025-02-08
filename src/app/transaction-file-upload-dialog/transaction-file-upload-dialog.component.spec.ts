import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFileUploadDialogComponent } from './transaction-file-upload-dialog.component';

describe('TransactionFileUploadDialogComponent', () => {
  let component: DataFileUploadDialogComponent;
  let fixture: ComponentFixture<DataFileUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataFileUploadDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataFileUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
