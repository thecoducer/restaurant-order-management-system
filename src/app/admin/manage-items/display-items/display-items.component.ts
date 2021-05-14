import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css'],
})
export class DisplayItemsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEdit() {
    this.router.navigate(['admin/items/edit']);
  }

  onAdd() {
    this.router.navigate(['admin/items/add']);
  }
}
