import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HandleCartService } from '../services/handle-cart.service';
import { HandleLocalStorageService } from '../services/handle-local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  isCartEmpty: boolean = true;
  totalAmt: number;
  totalItems: number;
  goToOrders: boolean = false;
  hideCartBar: boolean = false;

  constructor(
    private handleCartService: HandleCartService,
    private handleLocalStorage: HandleLocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.handleLocalStorage.getCartDataObservable().subscribe((data) => {
      // here data is cart data object
      if (data != null && Object.keys(data.items).length > 0) {
        this.isCartEmpty = false;
        this.totalAmt = data.totalAmt;
        this.totalItems = Object.keys(data.items).length;
      }

      if (data == null) {
        this.isCartEmpty = true;
      }
    });
  }

  ngOnInit(): void {
    this.handleCartService.onCartPageObs().subscribe((data) => {
      this.goToOrders = data;
    });

    this.handleCartService.onConfirmOrderPageObs().subscribe((data) => {
      this.hideCartBar = data;
    });
  }

  onContinue() {
    this.router.navigate(['cart']);
  }

  placeOrder() {
    this.router.navigate(['confirm-order']);
  }
}
