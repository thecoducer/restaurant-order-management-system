import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    // creating reactive signup form
    this.logInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  // method binded to form ngSubmit event
  onLogIn() {
    console.log(this.logInForm);
    //console.log(formData.form.value);
  }

}
