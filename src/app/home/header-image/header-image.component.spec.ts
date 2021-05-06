import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderImageComponent } from './header-image.component';

describe('HeaderImageComponent', () => {
  let component: HeaderImageComponent;
  let fixture: ComponentFixture<HeaderImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
