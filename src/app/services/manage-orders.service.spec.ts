import { TestBed } from '@angular/core/testing';

import { ManageOrdersService } from './manage-orders.service';

describe('ManageOrdersService', () => {
  let service: ManageOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
