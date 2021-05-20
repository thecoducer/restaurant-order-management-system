import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart.model';
import { HandleCartService } from '../services/handle-cart.service';
import { HandleLocalStorageService } from '../services/handle-local-storage.service';
import { OrderDataService } from '../services/order-data.service';

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

  constructor(
    private handleCartService: HandleCartService,
    private handleLocalStorageService: HandleLocalStorageService,
    private router: Router,
    private orderDataService: OrderDataService
  ) {
    this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
  }

  ngOnInit(): void {
    this.populateOrderData();
    this.handleCartService.hideCartBar(true);
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
    this.isProcessing = true;

    // clear cart
    this.cartObj = null;
    this.handleLocalStorageService.removeCartData();

    this.orderDataService.addOrderData(this.orderArray).subscribe(
      (res: any) => {
        this.isOrdered = true;
        this.orderDataService.setOrderId(res.name);        
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.orderArray);
  }
}
