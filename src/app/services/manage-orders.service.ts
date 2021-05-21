import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ManageOrdersService {
  passUserData: any = {};
  passUserDataSub = new BehaviorSubject<User>(null);

  constructor() { }

  getPassUserDataObservable() {
    return this.passUserDataSub.asObservable();
  }

  setUserData(obj: User) {
    this.passUserDataSub.next(obj);
  }

}
