import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemDataService {
  item: Item;

  constructor(private http: HttpClient, private afdb: AngularFireDatabase) {}

  // adds item data to Firebase DB
  addItemData(itemData: Item) {
    this.item = itemData;
    const path =
      environment.firebase.databaseURL +
      '/items/' +
      itemData.category +
      '.json';

    return this.http.post<Item>(path, itemData);
  }

  // sets item id in Firebase DB
  setItemId(idParam: string) {
    let modifiedIdParam: string;

    if (this.item.category === 'starters') {
      modifiedIdParam = 'S' + idParam;
    } else if (this.item.category === 'mains') {
      modifiedIdParam = 'M' + idParam;
    } else if (this.item.category === 'alcoholic-beverages') {
      modifiedIdParam = 'AB' + idParam;
    } else if (this.item.category === 'desserts') {
      modifiedIdParam = 'D' + idParam;
    }

    const itemRef = this.afdb.object(
      'items/' + this.item.category + '/' + idParam
    );
    itemRef.update({ id: modifiedIdParam });
  }

  /* async getAllItems() {
    const path = environment.firebase.databaseURL + '/items.json';
    let res: any;

    return await this.http
      .get(path)
      .pipe(
        map((responseData) => {
          const itemsArray: Item[] = [];
          for (const category in responseData) {
            if (responseData.hasOwnProperty(category)) {
              for (const item in responseData[category]) {
                itemsArray.push(responseData[category][item]);
              }
            }
          }
          return itemsArray;
        })
      )
      .toPromise();
  } */

  async getItemsCategoryWise(category: string) {
    const path = environment.firebase.databaseURL + '/items/' + category + '.json';

    return await this.http
      .get(path)
      .pipe(
        map((responseData) => {
          const itemsArray: Item[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              itemsArray.push(responseData[key]);
            }
          }
          return itemsArray;
        })
      )
      .toPromise();
  }
  
}
