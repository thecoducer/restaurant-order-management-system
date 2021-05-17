import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksIconComponent } from './drinks-icon.component';

describe('DrinksIconComponent', () => {
  let component: DrinksIconComponent;
  let fixture: ComponentFixture<DrinksIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinksIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinksIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
