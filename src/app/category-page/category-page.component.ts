import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../models/cart.model';
import { ItemDetails } from '../models/item-details.model';
import { Item } from '../models/item.model';
import { HandleCartService } from '../services/handle-cart.service';
import { ItemDataService } from '../services/item-data.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css'],
})
export class CategoryPageComponent implements OnInit, AfterViewInit {
  _starters: Item[] = [];
  _mains: Item[] = [];
  _alcoholicBeverages: Item[] = [];
  _desserts: Item[] = [];

  // merged item data with cart data
  starters: any[] = [];
  mains: any[] = [];
  alcoholicBeverages: any[] = [];
  desserts: any[] = [];

  isLoading: boolean = false;
  isLoaded: boolean = false;

  // for cart
  cartData: Cart;

  sectionName: string = '';

  showCategoryNavbar: boolean = false;
  currentActive: number;
  @ViewChild('startersRef') startersRef: ElementRef;
  @ViewChild('mainsRef') mainsRef: ElementRef;
  @ViewChild('dessertsRef') dessertsRef: ElementRef;
  @ViewChild('alcoholicBeveragesRef') alcoholicBeveragesRef: ElementRef;

  public startersOffset: Number = null;
  public mainsOffset: Number = null;
  public dessertsOffset: Number = null;
  public alcoholicBeveragesOffset: Number = null;

  constructor(
    private router: Router,
    private itemDataService: ItemDataService,
    private route: ActivatedRoute,
    private handleCartService: HandleCartService
  ) {
    this.route.fragment.subscribe((data) => {
      this.sectionName = data;
    });
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  /** for controlling the change of nav-pills in navbar on scroll position */
  ngAfterViewInit() {
    this.startersOffset = this.startersRef.nativeElement.offsetTop;
    this.mainsOffset = this.mainsRef.nativeElement.offsetTop;
    this.dessertsOffset = this.dessertsRef.nativeElement.offsetTop;
    this.alcoholicBeveragesOffset =
      this.alcoholicBeveragesRef.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    this.startersOffset = this.startersRef.nativeElement.offsetTop + 200;
    this.mainsOffset = this.mainsRef.nativeElement.offsetTop - 200;
    this.dessertsOffset = this.dessertsRef.nativeElement.offsetTop - 200;
    this.alcoholicBeveragesOffset =
      this.alcoholicBeveragesRef.nativeElement.offsetTop - 200;

    if (
      window.pageYOffset >= this.startersOffset &&
      window.pageYOffset < this.mainsOffset
    ) {
      this.currentActive = 1;
      this.showCategoryNavbar = true;
    } else if (
      window.pageYOffset >= this.mainsOffset &&
      window.pageYOffset < this.dessertsOffset
    ) {
      this.currentActive = 2;
      this.showCategoryNavbar = true;
    } else if (
      window.pageYOffset >= this.dessertsOffset &&
      window.pageYOffset < this.alcoholicBeveragesOffset
    ) {
      this.currentActive = 3;
      this.showCategoryNavbar = true;
    } else if (window.pageYOffset >= this.alcoholicBeveragesOffset) {
      this.currentActive = 4;
      this.showCategoryNavbar = true;
    } else {
      this.currentActive = 0;
      this.showCategoryNavbar = false;
    }
  }

  scrollTo(el: HTMLElement, v: number) {
    //el.scrollIntoView({ block: 'start', inline: 'nearest' });
    el.scrollIntoView();
    this.currentActive = v;
  }

  /** ---------  */

  async fetchItems() {
    try {
      this.isLoading = true;

      this._starters = await this.itemDataService.getItemsCategoryWise(
        'starters'
      );
      this._mains = await this.itemDataService.getItemsCategoryWise('mains');
      this._alcoholicBeverages =
        await this.itemDataService.getItemsCategoryWise('alcoholic-beverages');
      this._desserts = await this.itemDataService.getItemsCategoryWise(
        'desserts'
      );

      this.mergeItemAndCartData();

      this.isLoading = false;
      this.isLoaded = true;
    } catch (error) {
      console.log(error);
    }
  }

  fetchCartData() {
    this.cartData = this.handleCartService.getCartData();
  }

  mergeItemAndCartData() {
    this.fetchCartData();

    for (let key in this._starters) {
      let count = 0;
      const id = this._starters[key].id;

      if (this.cartData != null) {
        const itemDetailsObj = this.cartData.items[id];
        if (
          itemDetailsObj != undefined &&
          itemDetailsObj.quantity != undefined
        ) {
          count = this.cartData.items[id].quantity;
        }
      }

      this.starters[key] = { ...this._starters[key], quantity: count };
    }

    for (let key in this._mains) {
      let count = 0;
      const id = this._mains[key].id;

      if (this.cartData != null) {
        const itemDetailsObj = this.cartData.items[id];
        if (
          itemDetailsObj != undefined &&
          itemDetailsObj.quantity != undefined
        ) {
          count = this.cartData.items[id].quantity;
        }
      }

      this.mains[key] = { ...this._mains[key], quantity: count };
    }

    for (let key in this._desserts) {
      let count = 0;
      const id = this._desserts[key].id;

      if (this.cartData != null) {
        const itemDetailsObj = this.cartData.items[id];
        if (
          itemDetailsObj != undefined &&
          itemDetailsObj.quantity != undefined
        ) {
          count = this.cartData.items[id].quantity;
        }
      }

      this.desserts[key] = { ...this._desserts[key], quantity: count };
    }

    for (let key in this._alcoholicBeverages) {
      let count = 0;
      const id = this._alcoholicBeverages[key].id;

      if (this.cartData != null) {
        const itemDetailsObj = this.cartData.items[id];
        if (
          itemDetailsObj != undefined &&
          itemDetailsObj.quantity != undefined
        ) {
          count = this.cartData.items[id].quantity;
        }
      }

      this.alcoholicBeverages[key] = {
        ...this._alcoholicBeverages[key],
        quantity: count,
      };
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
  }
}
