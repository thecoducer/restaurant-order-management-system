import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemDataService {
  item: Item;

  constructor(private http: HttpClient, private afdb: AngularFireDatabase) {}

  addItemData(itemData: Item) {
    this.item = itemData;
    const path =
      environment.firebase.databaseURL +
      '/items/' +
      itemData.category +
      '.json';

    return this.http.post<Item>(path, itemData);
  }

  setItemId(idParam: string) {
    if (this.item.category === 'starters') {
      idParam = 'S' + idParam;
    } else if (this.item.category === 'mains') {
      idParam = 'M' + idParam;
    } else if (this.item.category === 'alcoholic-beverages') {
      idParam = 'AB' + idParam;
    } else if (this.item.category === 'desserts') {
      idParam = 'D' + idParam;
    }

    const itemRef = this.afdb.object(
      'items/' + this.item.category + '/' + idParam
    );
    itemRef.update({ id: idParam });
  }
}
