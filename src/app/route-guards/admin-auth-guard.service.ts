import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HandleLocalStorageService } from '../services/handle-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private handleLocalStorage: HandleLocalStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (
      this.handleLocalStorage.getIsAdmin() == 'false' ||
      this.handleLocalStorage.getIsAdmin() == null
    ) {
      this.router.navigate(['not-found']);
      return false;
    }

    return true;
  }
}
