import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  isAuthSub: Subscription;

  constructor(private authService: AuthService) {
    this.isAuthSub = this.authService
      .getIsAuthObservable()
      .subscribe((data) => {
        this.isAuthenticated = data;
        //console.log('data', data)
      });
    this.authService.initializeIsAuth();
    //console.log(this.isAuthenticated);
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

  onLogOut() {
    this.authService.logOut();
  }
}
