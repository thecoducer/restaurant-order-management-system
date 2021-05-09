import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAuthSub: Subscription;

  constructor(private authService: AuthService) {
    this.isAuthSub = this.authService.getIsAuthObservable().subscribe(data => {
      this.isAuthenticated = data;
    })
    this.authService.initializeIsAuth();
    console.log(this.isAuthenticated);
   }

  ngOnInit(): void {    
  }

}
