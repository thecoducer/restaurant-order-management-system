import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfileForm: FormGroup;
  private userDataSub: Subscription;
  private userData: User;

  updateStatus: string = 'Update profile';
  isUpdateSuccess: boolean = false;
  isUpdateFailure: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userDataSub = this.userDataService
      .getUserDataObservable()
      .subscribe((data) => {
        this.userData = data;
        if (this.userData != undefined) {
          //check for email?
          setTimeout(() => {
            this.userProfileForm.patchValue({
              name: this.userData.name,
              phone: this.userData.phone,
              email: this.userData.email,
              address: this.userData.address,
              role: this.userData.role.val,
            });
          }, 800);
        }
        console.log(this.userData);
      });

    this.userDataService.getUserDataFromFirebase();

    // creating reactive signup form
    this.userProfileForm = new FormGroup({
      name: new FormControl(this.userData.name, [Validators.required]),
      phone: new FormControl(this.userData.phone, [
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      email: new FormControl(this.userData.email),
      address: new FormControl(this.userData.address),
      role: new FormControl(this.userData.role.val),
    });
  }

  ngOnDestroy(): void {
    this.userDataSub.unsubscribe();
  }

  // updates user data
  onUpdate() {
    // handle the case when disabled attribute for submit button is deleted
    // from html
    if (this.userProfileForm.invalid) {
      return;
    }

    this.userData.name = this.checkUndefined(
      this.userProfileForm.get('name').value
    );
    this.userData.phone = this.checkUndefined(
      this.userProfileForm.get('phone').value
    );
    this.userData.address = this.checkUndefined(
      this.userProfileForm.get('address').value
    );
    this.userDataService.setUid = this.userData.uid;

    console.log(this.userProfileForm);

    this.userDataService
      .updateUserData(this.userData)
      .then(() => {
        this.isUpdateSuccess = true;
        this.updateStatus = 'Updated';

        setTimeout(() => {
          this.isUpdateSuccess = false;
          this.updateStatus = 'Update profile';
          let _name: string;
          _name = this.userDataService.getName.split(' ').join('-');
          this.router.navigate(['profile', _name]);
        }, 3500);
      })
      .catch(() => {
        this.isUpdateFailure = true;
        this.updateStatus = 'Try again';

        setTimeout(() => {
          this.isUpdateFailure = false;
          this.updateStatus = 'Update profile';
        }, 3500);
      });
  }

  /** utility functions */

  checkUndefined(v: any) {
    if (v == undefined) {
      return '';
    }
    return v;
  }
}
