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
  navItemClicked: boolean = false;
  navBtnClicked: boolean = false;

  constructor(private authService: AuthService) {
    this.isAuthSub = this.authService.getIsAuthObservable().subscribe(data => {
      this.isAuthenticated = data;
    })
    this.authService.initializeIsAuth();
    console.log(this.isAuthenticated);
   }

  ngOnInit(): void {    
  }

  onNavItemClicked() {
    console.log("navitemclicked")
    console.log("navitem", this.navItemClicked)
    console.log("navbtn", this.navBtnClicked)
    if(this.navBtnClicked === true) {
      return false;
    }
  }

  onNavBtnClicked() {
    console.log("btnclicked")
    console.log("navitem", this.navItemClicked)
    console.log("navbtn", this.navBtnClicked)
    this.navBtnClicked = !this.navBtnClicked;
  }

}
