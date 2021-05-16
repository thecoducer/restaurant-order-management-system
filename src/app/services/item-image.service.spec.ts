import { TestBed } from '@angular/core/testing';

import { ItemImageService } from './item-image.service';

describe('ItemImageService', () => {
  let service: ItemImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
