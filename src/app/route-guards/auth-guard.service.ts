import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HandleLocalStorageService } from '../services/handle-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate{
  constructor(
    private handleLocalStorage: HandleLocalStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (
      this.handleLocalStorage.getIsAuthenticated() === 'false' ||
      this.handleLocalStorage.getIsAuthenticated() == null
    ) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
