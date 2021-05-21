import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HandleLocalStorageService } from 'src/app/services/handle-local-storage.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  isAuthSub: Subscription;
  displayName: string = null;
  userDataSub: Subscription;
  isAdminSub: Subscription;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private userDataService: UserDataService,
    private router: Router,
    private handleLocalStorageService: HandleLocalStorageService
  ) {
    // get name and isAuthenticated values from local storage if they are present there
    this.displayName = this.handleLocalStorageService.getUserName();
    this.isAuthenticated = this.handleLocalStorageService.getIsAuthenticated() == 'true' ? true : false;
    this.isAdmin = this.handleLocalStorageService.getIsAdmin() == 'true' ? true : false;

    this.isAuthSub = this.authService
      .getIsAuthObservable()
      .subscribe((data) => {
        this.isAuthenticated = data;
      });

    // using observer pattern for getting name here
    // because if name gets updated in profile,
    // it will update the displayName too.
    this.userDataSub = this.userDataService
      .getUserDataObservable()
      .subscribe((data) => {
        if (data != null && data.name != null) {
          this.displayName = data.name;
        }
      });

      // get isAdmin data
    this.isAdminSub = this.userDataService.getIsAdminObservable().subscribe(data => {
      if(data != null) {
        this.isAdmin = data;
      }
    })
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }

  onLogOut() {
    this.displayName = null;
    this.isAuthenticated = false;
    this.userDataService.clearUserDataLocally();
    this.authService.logOut();
  }

  visitProfile() {
    let _name: string;
    _name = this.userDataService.getName.split(' ').join('-');
    this.router.navigate(['profile', _name]);
  }

  onManageItems() {
    this.router.navigate(['admin/items']);
  }

  onMyCart() {
    this.router.navigate(['cart']);
  }

  onMyOrders() {
    this.router.navigate(['orders']);
  }

  onManageOrders() {
    this.router.navigate(['admin/manage-orders']);
  }
}
