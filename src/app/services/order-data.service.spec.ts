import { TestBed } from '@angular/core/testing';

import { OrderDataService } from './order-data.service';

describe('OrderDataService', () => {
  let service: OrderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
