import { TestBed } from '@angular/core/testing';

import { HandleErrorsService } from './handle-errors.service';

describe('HandleErrorsService', () => {
  let service: HandleErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
