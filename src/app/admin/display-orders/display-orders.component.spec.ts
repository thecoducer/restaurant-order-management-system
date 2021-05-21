import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrdersComponent } from './display-orders.component';

describe('DisplayOrdersComponent', () => {
  let component: DisplayOrdersComponent;
  let fixture: ComponentFixture<DisplayOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
