import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  name: string;
  email: string;
  password: string;

  isBtnClicked: boolean = false;
  isSignedUp: boolean = false; // to show check icon
  isErrorFound: boolean = false;
  emailError: string = null;
  unknownError: string = null;
  isHideResponseErrors: boolean = true;
  isSigningUp: boolean = false; // to show spinner

  constructor(private authService: AuthService, private router: Router) {}

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

  // method binded to form ngSubmit event
  onSignUp() {
    this.isBtnClicked = true;
    this.isSigningUp = true;

    this.name = this.signUpForm.get('name').value;
    this.email = this.signUpForm.get('email').value;
    this.password = this.signUpForm.get('password').value;

    this.authService
      .signUp(this.email, this.password)
      .then((result) => {
        //console.log(result);

        this.isSignedUp = true;
        this.isSigningUp = false;
        //this.isBtnClicked = false;
        this.emailError = null;
        this.isHideResponseErrors = true;

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);
      })
      .catch((error) => {
        //console.log(error);

        this.isSignedUp = false;
        this.isSigningUp = false;
        this.isBtnClicked = false;
        this.isErrorFound = true;
        
        this.isHideResponseErrors = false;

       this.handleErrors(error.code);
      });
  }

  // returns custom error messages
  private handleErrors(e: string) {
    switch (e) {
      case 'auth/email-already-in-use':
        this.emailError = 'Email already in use.';
        break;
      
      case 'auth/invalid-email':
        this.emailError = 'Please enter a valid email.';
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
