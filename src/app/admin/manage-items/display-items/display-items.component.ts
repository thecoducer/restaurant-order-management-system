import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Item } from 'src/app/models/item.model';
import { ItemDataService } from 'src/app/services/item-data.service';

@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css'],
})
export class DisplayItemsComponent implements OnInit {
  starters: Item[] = [];
  mains: Item[] = [];
  alcoholicBeverages: Item[] = [];
  desserts: Item[] = [];

  isLoading: boolean = false;
  isLoaded: boolean = false;

  constructor(
    private router: Router,
    private itemDataService: ItemDataService
  ) {}

  ngOnInit(): void {
    this.fetchItems();
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
    this.router.navigate(['admin/items/edit',itemCategory, itemId]);
  }

  onAdd() {
    this.router.navigate(['admin/items/add']);
  }
}
