import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemImageService {
  private basePath = '/uploads/images/';
  private imageUrl: string = '';
  private imageUrlSub = new Subject<any>();

  constructor(
    private afdb: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  // upload image file to Firebase storage
  pushImageToStorage(file: File, itemCategory: string): Observable<number> {
    const filePath = this.basePath + itemCategory + '/' + file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadUrl) => {
            this.imageUrl = downloadUrl;
            this.imageUrlSub.next(this.imageUrl);
          });
        })
      )
      .subscribe((data: any) => {
        // console.log(data);
      });

    return uploadTask.percentageChanges();
  }

  async deleteImage(imageUrl: string) {    
    return await this.storage.refFromURL(imageUrl).delete().toPromise();
  }

  getimageUrlObservable() {
    return this.imageUrlSub.asObservable();
  }
}
