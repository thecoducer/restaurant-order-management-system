import { Component, OnInit } from '@angular/core';
import { FetchHeaderImageService } from '../../services/fetch-header-image.service';

@Component({
  selector: 'app-header-image',
  templateUrl: './header-image.component.html',
  styleUrls: ['./header-image.component.css'],
})
export class HeaderImageComponent implements OnInit {
  imageUrl: string;
  isFetchingImage: boolean = false;

  constructor(private fetchImgService: FetchHeaderImageService) {}

  ngOnInit(): void {
    this.isFetchingImage = true;

    this.fetchImgService.fetchImage().subscribe(
      (response) => {
        //console.log(response);
      },
      (error) => {
        this.imageUrl = error.url;
        this.isFetchingImage = false;
      }
    );
  }
}
