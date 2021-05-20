import { TestBed } from '@angular/core/testing';

import { HandleCartService } from './handle-cart.service';

describe('HandleCartService', () => {
  let service: HandleCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
