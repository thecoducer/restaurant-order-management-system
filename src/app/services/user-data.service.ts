import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userObj: AngularFireObject<any>;
  private userData: User = {
    uid: null,
    email: null,
    name: null,
    phone: null,
    address: null,
    role: 'customer',
  };
  userDataSubject = new BehaviorSubject<User>(this.userData);
  /* private _uid: string;
  private isAuthenticated: boolean; */
  private _requestedUserData: boolean = false;

  constructor(
    private afd: AngularFireDatabase,
    /* private authService: AuthService, */
    private http: HttpClient
  ) {
    /* this.authService.getAuthStateObservable().subscribe((data) => {
      if (data != null && data.uid != null) {
        this._uid = data.uid;
      }
    });

    this.authService.getIsAuthObservable().subscribe((data) => {
      this.isAuthenticated = data;
    });
    this.authService.initializeIsAuth(); */
  }

  createNewUser() {
    this.userObj = this.afd.object('users/' + this.userData.uid);
    this.userObj.set(this.userData);
    this.userDataSubject.next(this.userData); //
  }

  public set uid(v: string) {
    this.userData.uid = v;
  }

  public get uid() {
    return this.userData.uid;
  }

  public set email(v: string) {
    this.userData.email = v;
  }

  public set name(v: string) {
    this.userData.name = v;
  }

  public get name() {
    return this.userData.name;
  }

  public set phone(v: string) {
    this.userData.phone = v;
  }

  public set address(v: string) {
    this.userData.address = v;
  }

  public set requestedUserData(v: boolean) {
    this._requestedUserData = v;
  }

  getUserDataObservable() {
    return this.userDataSubject.asObservable();
  }

  getUserDataFromFirebase(force: boolean) {
    if (
      (localStorage.getItem('user') != null &&
        this._requestedUserData === false) ||
      force === true
    ) {
      this._requestedUserData = true;

      this.http
        .get(
          environment.firebase.databaseURL +
            '/users/' +
            localStorage.getItem('user') +
            '.json'
        )
        .subscribe((data: User) => {
          this.userDataSubject.next(data);
          this.userData = data;
          console.log(this.userData);
        });
    } else if (this._requestedUserData === true) {
      console.log('Already fetched user data.');
    }
  }

  updateUserData(userDataParam: User): Promise<void> {
    this.userDataSubject.next(userDataParam);
    this.userObj = this.afd.object('users/' + userDataParam.uid);
    return this.userObj.update(userDataParam);
  }

  clearUserDataLocally() {
    console.log(this.userData);
    Object.entries(this.userData).forEach(([key, val]) => {
      if (key === 'role') {
        this.userData[key] = 'customer';
      } else {
        this.userData[key] = null;
      }
    });
    console.log(this.userData);
  }

  // get and set userdata from firebase
  // so that userdata object is accessible all across app

  // sign in - profile - logout - sign in - profile
  // previous user data???
}
