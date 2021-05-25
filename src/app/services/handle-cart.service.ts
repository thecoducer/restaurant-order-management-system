import { Injectable, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { ItemDetails } from '../models/item-details.model';
import { HandleLocalStorageService } from './handle-local-storage.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ItemDataService } from './item-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleCartService implements OnInit {
  cartObj: Cart;
  itemsArray: ItemDetails[] = [];
  itemDetails: ItemDetails;
  uid: string;
  postPath: string;
  getPath: string;

  onCartPageSub = new BehaviorSubject<boolean>(false);
  onConfirmOrderPageSub = new BehaviorSubject<boolean>(false);

  constructor(private handleLocalStorageService: HandleLocalStorageService) {}

  ngOnInit() {
    this.cartObj = this.getCartData();
  }

  /** add or update items in cart */
  addOrUpdate(item: any) {
    // get cart data from local storage
    this.cartObj = this.getCartData();

    // add cart object for the first time
    if (this.cartObj == null) {
      const cart: Cart = {
        items: {
          [item.id]: {
            addedOn: new Date().toLocaleString(),
            quantity: item.quantity,
            itemId: item.id,
            category: item.category,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
          },
        },
        totalAmt: item.price,
      };

      this.handleLocalStorageService.addCartData(cart);
    } else {
      // add a new item to cart
      if (this.cartObj.items[item.id] == undefined) {
        const itemD: ItemDetails = {
          [item.id]: {
            addedOn: new Date().toLocaleString(),
            quantity: item.quantity,
            itemId: item.id,
            category: item.category,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
          },
        };

        // any better way?
        this.cartObj = {
          items: {
            ...this.cartObj.items,
            [item.id]: itemD[item.id],
          },
          totalAmt: this.getCartTotalAmount(item.price, true),
        };

        this.handleLocalStorageService.addCartData(this.cartObj);
      } else {
        // update quantity for existing item
        const itemD = this.cartObj.items[item.id];
        itemD.quantity += 1;
        this.cartObj.items[item.id] = itemD;

        // update total amount
        this.cartObj.totalAmt = this.getCartTotalAmount(item.price, true);

        this.handleLocalStorageService.addCartData(this.cartObj);
      }
    }
  }

  /** remove an item from cart */
  removeItem(item: any) {
    this.cartObj = this.getCartData();

    if (this.cartObj != null) {
      const itemD = this.cartObj.items[item.id];

      if (itemD.quantity > 1) {
        // decrease the quantity
        itemD.quantity -= 1;
        this.cartObj.items[item.id] = itemD;
      } else if (itemD.quantity == 1) {
        // when quantity is 1
        // remove the item
        delete this.cartObj.items[item.id];
      }

      this.cartObj.totalAmt = this.getCartTotalAmount(item.price, false);
    }

    this.handleLocalStorageService.addCartData(this.cartObj);
  }

  /** calculate total cart amount */
  getCartTotalAmount(price: number, add: boolean): number {
    let amt: number;

    if (add == true) {
      amt = Number(this.cartObj.totalAmt) + Number(price);
    } else {
      amt = Number(this.cartObj.totalAmt) - Number(price);
    }

    return amt;
  }

  /** check for cart data in local storage or Firebase */
  getCartData() {
    if (this.handleLocalStorageService.getCartData() != null) {
      return JSON.parse(this.handleLocalStorageService.getCartData());
    }

    return null;
  }

  /** clear cart */
  clearCart() {
    this.cartObj = null;
    this.handleLocalStorageService.removeCartData();
  }

  onCartPageObs() {
    this.onCartPageSub.next(false);
    return this.onCartPageSub.asObservable();
  }

  goToOrders(v: boolean) {
    this.onCartPageSub.next(v);
  }

  onConfirmOrderPageObs() {
    return this.onConfirmOrderPageSub.asObservable();
  }

  hideCartBar(v: boolean) {
    this.onConfirmOrderPageSub.next(v);
  }
}
