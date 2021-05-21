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
  userDataSub = new BehaviorSubject<User>(this.userData);
  isAdminSub = new BehaviorSubject<any>(null);

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

    this.userDataSub.next(this.userData);
  }

  getUserDataObservable() {
    return this.userDataSub.asObservable();
  }

  // --- replace this with an async method
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
          this.userDataSub.next(this.userData);
          this.handleLocalStorageService.setUserName(this.userData.name);

          // set isAdmin value
          if (data.role.val == 'admin') {
            this.handleLocalStorageService.setIsAdmin('true');
            this.isAdminSub.next(true);
          } else if (data.role.val == 'customer') {
            this.isAdminSub.next(false);
            this.handleLocalStorageService.setIsAdmin('false');
          }
        });
    }
  }

  getIsAdminObservable() {
    this.isAdminSub.next(this.userData.role.val == 'true' ? true : false);
    return this.isAdminSub.asObservable();
  }

  updateUserData(userDataParam: User): Promise<void> {
    this.handleLocalStorageService.setUserName(userDataParam.name);
    this.userDataSub.next(userDataParam);

    this.userObj = this.afdb.object('users/' + userDataParam.uid);
    return this.userObj.update(userDataParam);
  }

  async checkAddressPresentOrNot() {
    if (this.handleLocalStorageService.getUser() != null) {
      return await this.getAddressFromFirebase();
    }
  }

  async getAddressFromFirebase() {
    return await this.http
      .get(
        environment.firebase.databaseURL +
          '/users/' +
          localStorage.getItem('user') +
          '/address' +
          '.json'
      )
      .toPromise();
  }

  async getAllUsersData() {
    const path = environment.firebase.databaseURL + '/users.json';
    return await this.http.get(path).toPromise();
  }

  clearUserDataLocally() {
    Object.entries(this.userData).forEach(([key, val]) => {
      if (key === 'role') {
        this.userData.role.val = 'customer';
      } else {
        this.userData[key] = null;
      }
    });
  }

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
