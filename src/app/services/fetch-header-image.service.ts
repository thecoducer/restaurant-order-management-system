import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FetchHeaderImageService implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  fetchImage() {
    return this.http.get(environment.UNSPLASH_SOURCE_API);
  }
}
