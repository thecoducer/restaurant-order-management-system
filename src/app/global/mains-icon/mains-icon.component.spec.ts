import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainsIconComponent } from './mains-icon.component';

describe('MainsIconComponent', () => {
  let component: MainsIconComponent;
  let fixture: ComponentFixture<MainsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainsIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
