import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertsIconComponent } from './desserts-icon.component';

describe('DessertsIconComponent', () => {
  let component: DessertsIconComponent;
  let fixture: ComponentFixture<DessertsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DessertsIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
