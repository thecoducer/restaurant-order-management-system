import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HandleLocalStorageService } from '../services/handle-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerAuthGuard {
  constructor(
    private handleLocalStorage: HandleLocalStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (
      this.handleLocalStorage.getIsAdmin() == 'true' ||
      this.handleLocalStorage.getIsAdmin() == null
    ) {
      this.router.navigate(['not-found']);
      return false;
    }

    return true;
  }
}
