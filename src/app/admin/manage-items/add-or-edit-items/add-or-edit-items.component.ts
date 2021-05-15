import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Item } from 'src/app/models/item.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ItemDataService } from 'src/app/services/item-data.service';

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
  imageUrl: string;

  isAdd: boolean = false;
  isEdit: boolean = false;
  isUploaded: boolean = false;
  isUploading: boolean = false;
  isImage: boolean = false;
  isSubmitted: boolean = false;
  fileSizeExceeded: boolean = false;

  submitBtnText: string;
  addAnotherItemBtnText: string;
  unknownErrorText: string = null;
  previewPath: string = null;

  imageUrlSub: Subscription;

  validImageTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg'];

  item: Item = {
    id: '',
    name: '',
    description: '',
    amount: 0,
    category: '',
    imageUrl: '',
    addedOn: '',
    modifiedOn: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private itemDataService: ItemDataService
  ) {}

  ngOnInit(): void {
    // creating reactive signup form
    this.addOrEditItemsForm = new FormGroup({
      itemTitle: new FormControl('', [Validators.required]),
      itemDesc: new FormControl(''),
      itemPrice: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]+([,.]?[0-9]+)?$'),
      ]),
      itemCategory: new FormControl('', [Validators.required]),
      itemImage: new FormControl('', [Validators.required]),
    });

    this.route.params.subscribe((params) => {
      this.selectedPath = params['path'];
      this.submitBtnText =
        this.selectedPath === 'edit' ? 'Update item' : 'Add item';
      this.isAdd = this.selectedPath === 'add' ? true : false;
      this.isEdit = this.selectedPath === 'edit' ? true : false;
    });
  }

  // on selecting a file
  selectFile(event: any): void {
    this.setFile(event);

    this.checkImageOrNot(this.file);

    if (this.isImage) {
      this.checkFileSize(this.file);
    }

    if (this.isImage == true && this.fileSizeExceeded == false) {
      this.previewImage();
    }
  }

  // on clicking submit
  onSubmit() {
    // handle the case when disabled attribute for submit button is deleted
    // from html
    if (
      this.addOrEditItemsForm.invalid == true ||
      this.isImage == false ||
      this.fileSizeExceeded == true
    ) {
      return;
    }

    this.uploadImage();
  }

  private uploadImage(): void {
    const category = this.addOrEditItemsForm.get('itemCategory').value;

    this.isUploading = true;

    this.fileUploadService.pushFileToStorage(this.file, category).subscribe(
      (percentage) => {
        this.uploadPercentage = Math.round(percentage ? percentage : 0);

        if (this.uploadPercentage == 100) {
          this.isUploaded = true;
        }
      },
      (error) => {
        this.unknownErrorText = error;
        this.isUploaded = false;
        this.isUploading = false;
      }
    );

    // get the image url from Firebase
    // then push item data to Firebase Realtime DB
    this.imageUrlSub = this.fileUploadService
      .getimageUrlObservable()
      .subscribe((url) => {
        if (url != '' && url != null) {
          this.imageUrl = url;
          // unsubscribe here so that pushItemData() isn't called more than once
          this.imageUrlSub.unsubscribe();
          this.pushItemData();
        }
      });
  }

  private pushItemData() {
    this.item.name = this.addOrEditItemsForm.get('itemTitle').value;
    this.item.description = this.addOrEditItemsForm.get('itemDesc').value;
    this.item.amount = this.addOrEditItemsForm.get('itemPrice').value;
    this.item.category = this.addOrEditItemsForm.get('itemCategory').value;
    this.item.imageUrl = this.imageUrl;
    this.item.addedOn = new Date().toLocaleString();

    this.itemDataService.addItemData(this.item).subscribe(
      (response) => {
        if (response != null) {
          this.isSubmitted = true;
          this.submitBtnText = 'Done!';
          this.addAnotherItemBtnText = 'Add another item';
          // Firebase returns an unique identifier on adding some data via POST request
          // We fetch it from response.name
          this.itemDataService.setItemId(response.name);
        }
      },
      (error) => {
        this.unknownErrorText = error;
        this.isSubmitted = false;
        this.submitBtnText = 'Failed!';
        this.addAnotherItemBtnText = 'Try again?';
      }
    );
  }

  addAnotherItem() {
    this.addOrEditItemsForm.reset();

    this.file = null;
    this.selectedFile = null;
    this.uploadPercentage = -1;
    this.isImage = false;
    this.isUploaded = false;
    this.isUploading = false;
    this.isSubmitted = false;
    this.fileSizeExceeded = false;
    this.unknownErrorText = '';

    if (this.isAdd) {
      this.submitBtnText = 'Add item';
    }

    if (this.isEdit) {
      this.submitBtnText = 'Update item';
    }

    this.unknownErrorText = null;
    this.previewPath = null;

    this.item = {
      id: '',
      name: '',
      description: '',
      amount: 0,
      category: '',
      imageUrl: '',
      addedOn: '',
      modifiedOn: '',
    };
  }

  /** Utility functions */

  private setFile(event: any) {
    this.selectedFile = event.target.files;

    if (this.selectedFile) {
      this.file = this.selectedFile.item(0);
    }
  }

  // preview the selected image
  // uses FileReader and reads the selected file
  private previewImage() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.previewPath = fileReader.result as string;
    };
    fileReader.readAsDataURL(this.file);
  }

  private checkImageOrNot(file: File) {
    if (this.validImageTypes.indexOf(file.type) != -1) {
      this.isImage = true;
    } else {
      this.isImage = false;
    }
  }

  private checkFileSize(file: File) {
    const limit = 2048;

    if (Math.round(file.size / 1024) > limit) {
      this.fileSizeExceeded = true;
    } else {
      this.fileSizeExceeded = false;
    }
  }

  hideErrors() {
    this.unknownErrorText = null;
  }
}
