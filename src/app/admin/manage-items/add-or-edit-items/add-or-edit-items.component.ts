import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-add-or-edit-items',
  templateUrl: './add-or-edit-items.component.html',
  styleUrls: ['./add-or-edit-items.component.css'],
})
export class AddOrEditItemsComponent implements OnInit {
  addOrEditItemsForm: FormGroup;
  selectedPath: string;

  selectedFile: FileList = null;
  file: File | null;
  uploadPercentage = -1;

  isUploaded: boolean = false;
  isUploading: boolean = false;
  isUploadBtnClicked: boolean = false;
  isSelectedCategory: boolean = false;
  isImage: boolean = false;

  submitBtnText: string;
  previewPath: string = null;

  validImageTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    // creating reactive signup form
    this.addOrEditItemsForm = new FormGroup({
      itemTitle: new FormControl('', [Validators.required]),
      itemDesc: new FormControl(''),
      itemAmt: new FormControl('', [Validators.required]),
      itemCategory: new FormControl('Select a category', [Validators.required]),
      itemImage: new FormControl('', [Validators.required]),
    });

    this.route.params.subscribe((params) => {
      this.selectedPath = params['path'];
      this.submitBtnText =
        params['path'] === 'edit' ? 'Update item' : 'Add item';
    });
  }

  selectFile(event: any): void {
    this.setFile(event);

    if (this.checkImageOrNot(this.file)) {
      this.previewImage();
    }
  }

  onUpload(): void {
    this.isUploadBtnClicked = true;

    const category = this.addOrEditItemsForm.get('itemCategory').value;
    this.hasSelectedCategory(category);

    if (this.isSelectedCategory) {
      this.isUploading = true;

      if (this.file) {
        this.fileUploadService.pushFileToStorage(this.file, category).subscribe(
          (percentage) => {
            this.uploadPercentage = Math.round(percentage ? percentage : 0);

            if (this.uploadPercentage == 100) {
              this.isUploading = false;
              this.isUploaded = true;
            }
          },
          (error) => {
            this.isUploaded = false;
            console.log(error);
          }
        );
      }
    } 
  }

  onSubmit() {
    console.log(this.addOrEditItemsForm);
  }

  /** Utility functions */

  setFile(event: any) {
    this.selectedFile = event.target.files;

    if (this.selectedFile) {
      this.file = this.selectedFile.item(0);
    }
  }

  // preview the selected image
  // uses FileReader and reads the selected file
  previewImage() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.previewPath = fileReader.result as string;
    };
    fileReader.readAsDataURL(this.file);
  }

  checkImageOrNot(file: File): boolean {
    console.log(file.type);

    if (this.validImageTypes.indexOf(file.type) != -1) {
      this.isImage = true;
    } else {
      this.isImage = false;
    }

    return this.isImage;
  }

  hasSelectedCategory(category: string) {
    if (category == 'Select a category') {
      console.log('no category');
      this.isSelectedCategory = false;
    } else {
      this.isSelectedCategory = true;
    }
  }

  hideErrors() {
    this.isUploadBtnClicked = false;
    this.isSelectedCategory = false;
  }
}
