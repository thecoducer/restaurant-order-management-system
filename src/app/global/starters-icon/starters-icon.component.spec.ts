import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartersIconComponent } from './starters-icon.component';

describe('StartersIconComponent', () => {
  let component: StartersIconComponent;
  let fixture: ComponentFixture<StartersIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartersIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartersIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
