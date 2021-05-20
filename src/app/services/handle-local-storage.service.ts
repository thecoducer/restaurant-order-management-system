import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class HandleLocalStorageService {
  cartDataSub = new BehaviorSubject<Cart>(null);

  constructor() {}

  setUser(value: string) {
    localStorage.setItem('user', value);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  setIsAuthenticated(value: string) {
    localStorage.setItem('isAuthenticated', value);
  }

  getIsAuthenticated(): string {
    return localStorage.getItem('isAuthenticated');
  }

  setIsAdmin(value: string) {
    localStorage.setItem('isAdmin', value);
  }

  getIsAdmin() {
    return localStorage.getItem('isAdmin');
  }

  setUserName(value: string) {
    localStorage.setItem('name', value);
  }

  getUserName() {
    return localStorage.getItem('name');
  }

  clearDataOnLogOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('name');
  }

  // cart data
  addCartData(cart: Cart) {
    localStorage.setItem('cartData', JSON.stringify(cart));

    const obj = JSON.parse(localStorage.getItem('cartData'));

    // check if items in cart is empty
    if (Object.keys(obj.items).length == 0) {
      this.removeCartData();
    }

    this.cartDataSub.next(JSON.parse(this.getCartData()));
  }

  removeCartData() {
    if (localStorage.getItem('cartData') != null) {
      localStorage.removeItem('cartData');
    }
    this.cartDataSub.next(null);
  }

  getCartData() {
    return localStorage.getItem('cartData');
  }

  getCartDataObservable() {
    this.cartDataSub.next(JSON.parse(this.getCartData()));
    return this.cartDataSub.asObservable();
  }
}
