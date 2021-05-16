import { TestBed } from '@angular/core/testing';

import { HandleLocalStorageService } from './handle-local-storage.service';

describe('HandleLocalStorageService', () => {
  let service: HandleLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
