import { Component, OnDestroy, OnInit } from '@angular/core';
import { count } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { OrderDataService } from '../services/order-data.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  orders: any;
  orderArray: any = [];
  isLoading: boolean = true;
  isLoaded: boolean = false;

  constructor(private orderDataService: OrderDataService) {    
    this.fetchOrderData();
  }

  ngOnInit(): void {}

  async fetchOrderData() {
    this.isLoaded = false;
    this.isLoading = true;

    this.orders = await this.orderDataService.getOrderData();

    let count = 0;
    for (let orderId in this.orders) {
      count++;

      const orderObj: Order = this.orders[orderId];
      const oia = [];

      for (let oi in orderObj.orderedItems) {
        const o = {
          name: orderObj.orderedItems[oi].name,
          price: orderObj.orderedItems[oi].price,
          quantity: orderObj.orderedItems[oi].quantity,
        };
        oia.push(o);
      }

      const obj: any = {
        orderNo: count,
        orderId: orderObj.orderId,
        addedOn: orderObj.addedOn,
        orderedItems: oia,
        totalAmt: orderObj.totalAmt,
      };

      this.orderArray.push(obj);
    }

    // reverse it to show latest order first
    this.orderArray.reverse();

    this.isLoaded = true;
    this.isLoading = false;
  }

  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }
}
