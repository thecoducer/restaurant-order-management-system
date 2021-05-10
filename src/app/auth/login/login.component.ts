import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthErrorHandlerService } from 'src/app/services/auth-error-handler.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  logInForm: FormGroup;

  email: string;
  password: string;

  errorObj: any;
  isLoggingIn: boolean = false;
  isBtnClicked: boolean = false;
  isHideResponseErrors: boolean = true;
  errorSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authErrorHandler: AuthErrorHandlerService
  ) {
    // creating a subscription to listen to the subject in authService
    // so that we get updated whenever the errorObj changes
    this.errorSub = authErrorHandler.getErrorObservable().subscribe((data) => {
      this.errorObj = data;
    });

    // calls the next method on subject in authService
    // and we get the errorObj data here
    this.authErrorHandler.initializeErrorObj();
  }

  ngOnInit(): void {
    // creating reactive signup form
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  // method binded to form ngSubmit event
  onLogIn() {
    this.isBtnClicked = true;
    this.isLoggingIn = true;

    this.email = this.logInForm.get('email').value;
    this.password = this.logInForm.get('password').value;

    this.authService
      .signIn(this.email, this.password)
      .then((result) => {
        //console.log(result);

        this.isLoggingIn = false;
        this.isHideResponseErrors = true;
        //this.authService.setIsAuthenticated(true);

        this.router.navigate(['']);
      })
      .catch((error) => {
        //console.log(error);
        this.isBtnClicked = false;
        this.isHideResponseErrors = false;
        this.isLoggingIn = false;

        this.authErrorHandler.handleAuthError(error, 'logIn');
      });
  }

  // hides error messages on input click
  hideResponseErrors() {
    if (
      this.authErrorHandler.foundLogInError &&
      this.isHideResponseErrors === false
    ) {
      this.isHideResponseErrors = !this.isHideResponseErrors;
      this.authErrorHandler.clearLogInError();
    }
  }
}
