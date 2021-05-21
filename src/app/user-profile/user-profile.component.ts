import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { HandleLocalStorageService } from '../services/handle-local-storage.service';
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
  private pathVar: string = '';

  isUpdateSuccess: boolean = false;
  isUpdateFailure: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private route: ActivatedRoute,
    private handleLocalStorageService: HandleLocalStorageService
  ) {
    // get the path variable
    this.pathVar = this.route.snapshot.params['name'];
  }

  ngOnInit(): void {
    // show 404 if profile path name doesn't match logged in user's username
    if (this.pathVar != '' && this.pathVar != undefined) {
      let _name = this.makeProfilePath(
        this.handleLocalStorageService.getUserName()
      );

      if (this.pathVar != _name) {
        this.router.navigate(['not-found']);
      }
    }

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

    this.userDataService
      .updateUserData(this.userData)
      .then(() => {
        this.isUpdateSuccess = true;

        let _name: string;
        _name = this.makeProfilePath(this.userDataService.getName);
        this.router.navigate(['profile', _name]);
      })
      .catch(() => {
        this.isUpdateFailure = true;
      });

      setTimeout(() => {
        this.isUpdateFailure = this.isUpdateSuccess = false;
      }, 2000);
  }

  /** utility functions */

  replaceUndefinedOrNull(v: any): string {
    if (v == undefined || v == null) {
      return ' ';
    }
    return v;
  }

  /** make profile path from name of the user */
  makeProfilePath(v: string) {
    return v.split(' ').join('-');
  }
}
