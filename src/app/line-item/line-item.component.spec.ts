import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineItemComponent } from './line-item.component';

describe('LineItemComponent', () => {
  let component: LineItemComponent;
  let fixture: ComponentFixture<LineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
