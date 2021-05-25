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

  /** get item by category */
  async getItemsCategoryWise(category: string) {
    const path =
      environment.firebase.databaseURL + '/items/' + category + '.json';

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

  /** get item by id */
  async getItemById(category: string, id: string) {
    const pathItemId = this.getPathItemId(id);

    const path =
      environment.firebase.databaseURL +
      '/items/' +
      category +
      '/' +
      pathItemId +
      '.json';

    return await this.http
      .get(path)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .toPromise();
  }

  /** delete item data from Firebase DB */
  async deleteItemData(itemCategory: string, itemId: string) {
    const pathItemId = this.getPathItemId(itemId);
    const itemRef = this.afdb.object(
      'items/' + itemCategory + '/' + pathItemId
    );
    return await itemRef.remove();
  }

  /** delete imageUrl value when image deleted from storage */
  async deleteImageUrl(itemCategory: string, itemId: string) {
    const pathItemId = this.getPathItemId(itemId);
    const itemRef = this.afdb.object(
      'items/' + itemCategory + '/' + pathItemId
    );
    return await itemRef.update({ imageUrl: '' });
  }

  /** update item data */
  async updateItemData(item: Item, itemCategory: string, itemId: string) {
    const pathItemId = this.getPathItemId(itemId);
    const itemRef = this.afdb.object(
      'items/' + itemCategory + '/' + pathItemId
    );
    return await itemRef.update(item);
  }

  /** set/toggle item availability status */
  async setIsAvailable(v: boolean, itemCategory: string, itemId: string) { 
    const pathItemId = this.getPathItemId(itemId);
    const itemRef = this.afdb.object(
      'items/' + itemCategory + '/' + pathItemId
    );
    return await itemRef.update({ isAvailable: v });
  }

  /** checks item availability status before confirm order */
  async reportItemAvailability(orders: any[]) {
    let notAvailableItems: any[] = [];

    for(let i in orders) {
      const obj: Item = await this.getItemById(orders[i].category, orders[i].id) as Item;

      if(obj.isAvailable == false){
        notAvailableItems.push({name: obj.name, id: obj.id});
      }
    }

    return notAvailableItems;
    
  }

  /** utilities */

  getPathItemId(itemId: string): string {
    let pathItemId = '';

    if (!itemId.startsWith('-')) {
      let parts: string[] = itemId.split('-');
      for (let i = 1; i < parts.length; i++) {
        pathItemId += '-' + parts[i];
      }
    } else {
      pathItemId = itemId;
    }

    return pathItemId;
  }

  /** utilities end */

  async getAllItems() {
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
  }
}
