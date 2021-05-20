import { TestBed } from '@angular/core/testing';

import { CustomerAuthGuardService } from './customer-auth-guard.service';

describe('CustomerAuthGuardService', () => {
  let service: CustomerAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
