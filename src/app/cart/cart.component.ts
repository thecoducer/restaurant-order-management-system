import { Component, OnInit } from '@angular/core';
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

  constructor(
    private handleCartService: HandleCartService,
    private handleLocalStorage: HandleLocalStorageService
  ) {
    this.handleLocalStorage.getCartDataObservable().subscribe((data) => {
      // here data is cart data object
      if(data != null && Object.keys(data.items).length > 0) {
        this.isCartEmpty = false;
        this.totalAmt = data.totalAmt;
        this.totalItems = Object.keys(data.items).length;
      }

      if(data == null) {
        this.isCartEmpty = true;
      }
    });
  }

  ngOnInit(): void {
  }
}
