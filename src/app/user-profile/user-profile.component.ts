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
          if (this.userData.name != undefined) {
            this.userProfileForm.patchValue({
              name: this.userData.name,
            });
          }
          if (this.userData.phone != undefined) {
            this.userProfileForm.patchValue({
              phone: this.userData.phone,
            });
          }
          if (this.userData.email != undefined) {
            this.userProfileForm.patchValue({
              email: this.userData.email,
            });
          }
          if (this.userData.address != undefined) {
            this.userProfileForm.patchValue({
              address: this.userData.address,
            });
          }
          /* if (this.userData.role != undefined && this.userData.role.val != undefined) {
          this.userProfileForm.patchValue({
            role: this.userData.role.val
          });
          */
        }

        console.log(this.userData);
      });

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

    this.userData.name = this.userProfileForm.get('name').value;
    this.userData.phone = this.userProfileForm.get('phone').value;
    this.userData.address = this.userProfileForm.get('address').value;
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

  replaceUndefinedOrNull(v: any): string {
    if (v == undefined || v == null) {
      return ' ';
    }
    return v;
  }
}
