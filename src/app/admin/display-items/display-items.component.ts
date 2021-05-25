import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemDataService } from 'src/app/services/item-data.service';

@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css'],
})
export class DisplayItemsComponent implements OnInit, AfterViewInit {
  starters: Item[] = [];
  mains: Item[] = [];
  alcoholicBeverages: Item[] = [];
  desserts: Item[] = [];

  isLoading: boolean = false;
  isLoaded: boolean = false;

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
    private route: ActivatedRoute
  ) {
    this.route.fragment.subscribe((data) => {
      this.sectionName = data;
    });
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  ngAfterViewInit() {
    this.startersOffset = this.startersRef.nativeElement.offsetTop;
    this.mainsOffset = this.mainsRef.nativeElement.offsetTop;
    this.dessertsOffset = this.dessertsRef.nativeElement.offsetTop;
    this.alcoholicBeveragesOffset =
      this.alcoholicBeveragesRef.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    this.startersOffset = this.startersRef.nativeElement.offsetTop+200;
    this.mainsOffset = this.mainsRef.nativeElement.offsetTop-200;
    this.dessertsOffset = this.dessertsRef.nativeElement.offsetTop-200;
    this.alcoholicBeveragesOffset =
      this.alcoholicBeveragesRef.nativeElement.offsetTop-200;

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

  async fetchItems() {
    try {
      this.isLoading = true;

      this.starters = await this.itemDataService.getItemsCategoryWise(
        'starters'
      );
      this.mains = await this.itemDataService.getItemsCategoryWise('mains');
      this.alcoholicBeverages = await this.itemDataService.getItemsCategoryWise(
        'alcoholic-beverages'
      );
      this.desserts = await this.itemDataService.getItemsCategoryWise(
        'desserts'
      );

      this.isLoading = false;
      this.isLoaded = true;
    } catch (error) {
      console.log(error);
    }
  }

  onEdit(itemCategory: string, itemId: string) {
    this.router.navigate(['admin/items/edit', itemCategory, itemId]);
  }

  onAdd() {
    this.router.navigate(['admin/items/add']);
  }

  setAvailabilityStatus(item: any) {
    const status = item.isAvailable;
    console.log(status);
    item.isAvailable = !status;
    
    this.itemDataService.setIsAvailable(!status, item.category, item.id);
  }
}
