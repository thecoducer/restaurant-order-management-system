import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;

  email: string;
  password: string;

  isLoggingIn: boolean = false;
  isErrorFound: boolean = false;
  emailError: string = null;
  passwordError: string = null;
  unknownError: string = null;
  isBtnClicked: boolean = false;
  isHideResponseErrors: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

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

  // method binded to form ngSubmit event
  onLogIn() {
    this.isBtnClicked = true;
    this.isLoggingIn = true;

    this.email = this.logInForm.get('email').value;
    this.password = this.logInForm.get('password').value;

    this.authService
      .signIn(this.email, this.password)
      .then((result) => {
        console.log(result);

        this.isLoggingIn = false;
        this.isHideResponseErrors = true;

        this.router.navigate(['']);
      })
      .catch((error) => {
        console.log(error);

        this.isBtnClicked = false;
        this.isHideResponseErrors = false;
        this.isLoggingIn = false;
        this.isErrorFound = true;

        this.handleErrors(error.code);
      });
  }

  private handleErrors(e: string) {
    switch (e) {
      case 'auth/user-not-found':
        this.emailError = 'Email not registered.';
        break;

      case 'auth/wrong-password':
        this.passwordError = "Password doesn't match.";
        break;

      default:
        this.unknownError = e;
        break;
    }
  }

  // hides error messages on input click
  hideResponseErrors() {
    if (this.isErrorFound) {
      this.isHideResponseErrors = !this.isHideResponseErrors;
      this.isErrorFound = false;
    }
  }
}
