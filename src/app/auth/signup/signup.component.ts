import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    // creating reactive signup form
    this.signUpForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  // method binded to form ngSubmit event
  onSignUp() {
    console.log(this.signUpForm);
    //console.log(formData.form.value);
  }

}
