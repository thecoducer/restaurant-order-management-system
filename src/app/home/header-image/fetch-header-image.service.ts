import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FetchHeaderImageService implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  fetchImage() {
    return this.http.get('https://source.unsplash.com/1280x900/?restaurant');
  }
}
