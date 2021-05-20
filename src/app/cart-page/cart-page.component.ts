import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model';
import { HandleCartService } from '../services/handle-cart.service';
import { HandleLocalStorageService } from '../services/handle-local-storage.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartObj: Cart;
  cartArray: any[] = [];
  isCartEmpty: boolean = true;

  constructor(
    private handleLocalStorageService: HandleLocalStorageService,
    private handleCartService: HandleCartService,
    private router: Router
  ) {
    this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
  }

  ngOnInit(): void {
    this.populateCartData();
    // hide bottom cart bar when viewing cart page
    this.handleCartService.goToOrders(true);
  }

  ngOnDestroy() {
    // show bottom cart bar when cart page component is destroyed
   this.handleCartService.goToOrders(false);
  }

  populateCartData() {
    if (this.cartObj != null && this.cartObj.items != undefined) {
      this.isCartEmpty = false;
      const itemD = this.cartObj.items;

      for (let item in itemD) {
        const itemObj = itemD[item];

        const obj = {
          id: itemObj.itemId,
          name: itemObj.name,
          category: itemObj.category,
          price: itemObj.price,
          imageUrl: itemObj.imageUrl,
          quantity: itemObj.quantity,
        };

        this.cartArray.push(obj);
      }
    } else {
      this.isCartEmpty = true;
    }
  }

  /** add to cart */
  onAdd(item: any) {
    item.quantity += 1; //two-way binded
    this.handleCartService.addOrUpdate(item);
  }

  /** remove from cart */
  onRemove(item: any) {
    item.quantity -= 1; //two-way binded
    this.handleCartService.removeItem(item);

    // if not items in cart
    // set isCartEmpty to true
    this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
    if(this.cartObj == null) {
      this.isCartEmpty = true;
    }
  }

  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }

  clearCart() {
    this.isCartEmpty = true;
    this.cartArray = [];
    this.cartObj = null;
    this.handleCartService.clearCart();
  }
}
