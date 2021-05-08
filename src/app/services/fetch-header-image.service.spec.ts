import { TestBed } from '@angular/core/testing';

import { FetchHeaderImageService } from './fetch-header-image.service';

describe('FetchHeaderImageService', () => {
  let service: FetchHeaderImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchHeaderImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
