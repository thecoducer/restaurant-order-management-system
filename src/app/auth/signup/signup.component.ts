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
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  /** method binded to form ngSubmit event */
  onSignUp() {
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

        // assigning values to userData object
        this.userDataService.name = this.name;
        this.userDataService.email = this.email;
        this.userDataService.uid = result.user.uid;
        this.userDataService.createNewUser();

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
          this.userDataService.name = result.user.displayName;
          this.userDataService.email = result.user.email;
          this.userDataService.uid = result.user.uid;
          this.userDataService.createNewUser();
          this.router.navigate(['']);
        } else if (result.additionalUserInfo.isNewUser == false) {
          setTimeout(() => {
            this.userDataService.getUserDataFromFirebase(true);
            this.router.navigate(['']);
          }, 3000);
          // ?
        }
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
