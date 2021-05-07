import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholicBeveragesComponent } from './alcoholic-beverages.component';

describe('AlcoholicBeveragesComponent', () => {
  let component: AlcoholicBeveragesComponent;
  let fixture: ComponentFixture<AlcoholicBeveragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlcoholicBeveragesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholicBeveragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
