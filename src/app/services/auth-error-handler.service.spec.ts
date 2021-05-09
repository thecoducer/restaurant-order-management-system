import { TestBed } from '@angular/core/testing';

import { AuthErrorHandlerService } from './auth-error-handler.service';

describe('AuthErrorHandlerService', () => {
  let service: AuthErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
