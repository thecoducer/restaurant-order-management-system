import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userObj: AngularFireObject<any>;
  constructor(private afd: AngularFireDatabase) {
    this.userObj = this.afd.object('users');
   }

  createNewUser() {
    this.userObj.set({name: 'Mayukh', age: 23, uid: "ak56dfgdasdaqwe2q3213"});
  }
}
