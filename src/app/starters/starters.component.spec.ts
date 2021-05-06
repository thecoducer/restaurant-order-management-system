import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartersComponent } from './starters.component';

describe('StartersComponent', () => {
  let component: StartersComponent;
  let fixture: ComponentFixture<StartersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
