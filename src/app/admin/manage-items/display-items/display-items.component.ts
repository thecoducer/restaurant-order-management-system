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
  itemsArray: Item[] = [];

  constructor(
    private router: Router,
    private itemDataService: ItemDataService
  ) {}

  ngOnInit(): void {
    this.itemDataService.getAllItems().subscribe((data) => {
      this.itemsArray = data;
      console.log(this.itemsArray);
    });
  }

  onEdit() {
    this.router.navigate(['admin/items/edit']);
  }

  onAdd() {
    this.router.navigate(['admin/items/add']);
  }
}
