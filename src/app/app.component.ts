import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    // auto log in user if local storage has the uid returned by firebase
    this.authService.autoLogIn();
  }
}
