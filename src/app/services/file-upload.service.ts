import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads/images/';

  constructor(
    private afdb: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(file: File, itemCategory: string): Observable<number> {
    const filePath = this.basePath + itemCategory + '/' + file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadUrl => {
          console.log(downloadUrl)
        })
      })
    ).subscribe(data => {
      console.log(data)
    });

    return uploadTask.percentageChanges();
  }
}
