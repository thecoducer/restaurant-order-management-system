import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model';
import { HandleCartService } from '../services/handle-cart.service';
import { HandleLocalStorageService } from '../services/handle-local-storage.service';
import { ItemDataService } from '../services/item-data.service';
import { OrderDataService } from '../services/order-data.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css'],
})
export class ConfirmOrderComponent implements OnInit, OnDestroy {
  cartObj: Cart;
  orderArray: any[] = [];
  totalAmt: string;
  isOrdered: boolean = false;
  isProcessing: boolean = false;
  addressNotFound: boolean = false;
  notAvailableItems: any[] = [];
  itemAvailabilityChecked: boolean = false;

  constructor(
    private handleCartService: HandleCartService,
    private handleLocalStorageService: HandleLocalStorageService,
    private router: Router,
    private orderDataService: OrderDataService,
    private userDataService: UserDataService,
    private itemDataService: ItemDataService
  ) {
    this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
  }

  ngOnInit(): void {
    this.populateOrderData();
    this.handleCartService.hideCartBar(true);

    this.userDataService.checkAddressPresentOrNot().then((data: string) => {
      if (data == null || data == undefined || data.trim().length < 1) {
        this.addressNotFound = true;
      }
    });
  }

  ngOnDestroy() {
    this.handleCartService.hideCartBar(false);
  }

  populateOrderData() {
    if (this.cartObj != null && this.cartObj.items != undefined) {
      const itemD = this.cartObj.items;

      for (let item in itemD) {
        const itemObj = itemD[item];

        const obj = {
          id: itemObj.itemId,
          category: itemObj.category,
          name: itemObj.name,
          price: itemObj.price,
          quantity: itemObj.quantity,
        };

        this.orderArray.push(obj);
      }
    }

    this.calculateTotalAmount();
  }

  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }

  calculateTotalAmount() {
    const GST_Amt = (18 / 100) * Number(this.cartObj.totalAmt);
    this.totalAmt = (Number(this.cartObj.totalAmt) + GST_Amt).toFixed(2);
  }

  goBackToCart() {
    this.router.navigate(['cart']);
  }

  confirm() {
    // don't allow to confirm order if address is not present
    if (this.addressNotFound === true) {
      return;
    }

    this.onConfirm();
  }

  async onConfirm() {
    this.isProcessing = true;
    this.notAvailableItems = await this.itemDataService.reportItemAvailability(
      this.orderArray
    );

    // if there are not available items in order
    if (this.notAvailableItems.length > 0) {
      this.isProcessing = false;
    } else {
      // clear cart
      this.cartObj = null;
      this.handleLocalStorageService.removeCartData();

      this.orderDataService
        .addOrderData(this.orderArray, this.totalAmt)
        .subscribe(
          (res: any) => {
            this.isOrdered = true;
            this.orderDataService.setOrderId(res.name);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  goToProfile() {
    let _name = this.makeProfilePath(
      this.handleLocalStorageService.getUserName()
    );
    this.router.navigate(['profile', _name]);
  }

  /** utilities */

  /** make profile path from name of the user */
  makeProfilePath(v: string) {
    return v.split(' ').join('-');
  }
}
