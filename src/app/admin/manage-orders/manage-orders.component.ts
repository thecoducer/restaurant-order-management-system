import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { ManageOrdersService } from 'src/app/services/manage-orders.service';
import { OrderDataService } from 'src/app/services/order-data.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  usersData: any;
  usersDataArray: any[] = [];

  isLoading: boolean = false;
  isLoaded: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private orderDataService: OrderDataService,
    private router: Router,
    private manageOrdersService: ManageOrdersService
  ) {}

  ngOnInit(): void {
    this.fetchAllUsersData();
  }

  async fetchAllUsersData() {
    this.isLoading = true;

    this.usersData = await this.userDataService.getAllUsersData();
    this.formatUsersData();

    this.isLoading = false;
    this.isLoaded = true;
  }

  formatUsersData() {
    for (let obj in this.usersData) {
      this.usersDataArray.push(this.usersData[obj]);
    }
  }

  goToOrders(user: User) {
    console.log(user);
    
    this.manageOrdersService.setUserData(user);
    this.router.navigate(['admin', user.uid, 'orders']);
  }
}
