import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthErrorHandlerService } from 'src/app/services/auth-error-handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;

  name: string;
  email: string;
  password: string;

  errorObj: any;
  isBtnClicked: boolean = false;
  isSignedUp: boolean = false;
  isHideResponseErrors: boolean = true;
  isSigningUp: boolean = false;
  errorSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authErrorHandler: AuthErrorHandlerService,
    private userDataService: UserDataService
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
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    // reset the errorObj
    // so that previous errors don't come up in view 
    this.errorObj = {
      logIn: {
        errorFound: null,
        email: null,
        password: null,
        unknown: null,
      },
      signUp: {
        errorFound: null,
        name: null,
        email: null,
        password: null,
        unknown: null,
      },
    };
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  /** method binded to form ngSubmit event */
  onSignUp() {
    // handle the case when disabled attribute for submit button is deleted
    // from html
    if (this.signUpForm.invalid) {
      return;
    }

    this.isBtnClicked = true;
    this.isSigningUp = true;

    this.name = this.signUpForm.get('name').value;
    this.email = this.signUpForm.get('email').value;
    this.password = this.signUpForm.get('password').value;

    this.authService
      .signUp(this.email, this.password)
      .then((result) => {
        this.isSignedUp = true;
        this.isSigningUp = false;
        this.isHideResponseErrors = true;

        this.userDataService.createNewUser(
          this.name,
          this.email,
          result.user.uid
        );

        setTimeout(() => {
          this.router.navigate(['']);
        }, 1500);
      })
      .catch((error) => {
        this.isSignedUp = false;
        this.isSigningUp = false;
        this.isBtnClicked = false;
        this.isHideResponseErrors = false;

        this.authErrorHandler.handleAuthError(error, 'signUp');
      });
  }

  /** on clicking sign up with google */
  onSignUpWithGoogle() {
    this.authService
      .authenticateWithGoogle()
      .then((result) => {
        // save user data only the first time
        if (result.additionalUserInfo.isNewUser == true) {
          this.userDataService.createNewUser(
            result.user.displayName,
            result.user.email,
            result.user.uid
          );
        }

        setTimeout(() => {
          this.router.navigate(['']);
        }, 1500);
      })
      .catch((error) => {
        this.authErrorHandler.handleAuthError(error, 'signUp');
      });
  }

  /** hides error messages on input click */
  hideResponseErrors() {
    if (
      this.authErrorHandler.foundSignUpError &&
      this.isHideResponseErrors === false
    ) {
      this.isHideResponseErrors = !this.isHideResponseErrors;
      this.authErrorHandler.clearSignUpError();
    }
  }
}
