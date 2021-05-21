import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { count } from 'rxjs/operators';
import { Order } from 'src/app/models/order.model';
import { ManageOrdersService } from 'src/app/services/manage-orders.service';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.css'],
})
export class DisplayOrdersComponent implements OnInit {
  orders: any;
  orderArray: any = [];
  isLoading: boolean = true;
  isLoaded: boolean = false;
  userData: any = {};

  constructor(
    private orderDataService: OrderDataService,
    private route: ActivatedRoute,
    private manageOrdersService: ManageOrdersService
  ) {
    this.manageOrdersService.getPassUserDataObservable().subscribe((data) => {
      if (data != null) {
        this.userData = data;
        this.fetchOrderData();
      }
    });
  }

  ngOnInit(): void {}

  async fetchOrderData() {
    this.isLoaded = false;
    this.isLoading = true;

    this.orders = await this.orderDataService.getOrderDataById(
      this.userData.uid
    );

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
