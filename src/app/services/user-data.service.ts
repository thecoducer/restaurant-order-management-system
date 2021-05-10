import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
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

  constructor(
    private afd: AngularFireDatabase,
    private authService: AuthService
  ) {}

  createNewUser() {
    this.userObj = this.afd.object('users/' + this.userData.uid);
    this.userObj.set(this.userData);
  }

  public set uid(v: string) {
    this.userData.uid = v;
  }

  public set email(v: string) {
    this.userData.email = v;
  }

  public set name(v: string) {
    this.userData.name = v;
  }

  public set phone(v: string) {
    this.userData.phone = v;
  }

  public set address(v: string) {
    this.userData.address = v;
  }
}
