import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { HandleLocalStorageService } from './handle-local-storage.service';

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
    role: {
      val: 'customer',
    },
  };
  userDataSubject = new BehaviorSubject<User>(this.userData);

  constructor(
    private afdb: AngularFireDatabase,
    private http: HttpClient,
    private handleLocalStorageService: HandleLocalStorageService
  ) {}

  /** saves new user data in Firebase DB */
  createNewUser(name: string, email: string, uid: string) {
    this.userData.name = name;
    this.userData.email = email;
    this.userData.uid = uid;

    this.userObj = this.afdb.object('users/' + this.userData.uid);
    this.userObj.set(this.userData).then(() => {
      this.getUserDataFromFirebase();
    });

    this.userDataSubject.next(this.userData);
  }

  getUserDataObservable() {
    return this.userDataSubject.asObservable();
  }

  getUserDataFromFirebase() {
    if (this.handleLocalStorageService.getUser() != null) {
      //console.log('getting user data from firebase');
      this.http
        .get(
          environment.firebase.databaseURL +
            '/users/' +
            localStorage.getItem('user') +
            '.json'
        )
        .subscribe((data: User) => {
          this.userData = data;
          this.userDataSubject.next(this.userData);
          this.handleLocalStorageService.setUserName(this.userData.name);
          //console.log('got from firebase', this.userData);
        });
    }
  }

  updateUserData(userDataParam: User): Promise<void> {
    this.handleLocalStorageService.setUserName(userDataParam.name);
    this.userDataSubject.next(userDataParam);
    this.userObj = this.afdb.object('users/' + userDataParam.uid);
    return this.userObj.update(userDataParam);
  }

  clearUserDataLocally() {
    console.log(this.userData);
    Object.entries(this.userData).forEach(([key, val]) => {
      if (key === 'role') {
        this.userData.role.val = 'customer';
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

  public set setUid(v: string) {
    this.userData.uid = v;
  }

  public get getUid() {
    return this.userData.uid;
  }

  public set setEmail(v: string) {
    this.userData.email = v;
  }

  public set setName(v: string) {
    this.userData.name = v;
  }

  public get getName() {
    return this.userData.name;
  }

  public set setPhone(v: string) {
    this.userData.phone = v;
  }

  public set setAddress(v: string) {
    this.userData.address = v;
  }
}
