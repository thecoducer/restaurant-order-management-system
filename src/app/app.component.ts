import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './services/auth.service';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private userDataService: UserDataService
  ) {
    // auto log in user if local storage has the uid returned by firebase
    this.authService.autoLogIn();
  }

  ngOnInit() {
    // enables ripple effect for primeng
    this.primengConfig.ripple = true;
    this.userDataService.getUserDataFromFirebase(false);
  }
}
