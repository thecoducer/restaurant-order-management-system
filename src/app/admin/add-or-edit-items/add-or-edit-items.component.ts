import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Item } from 'src/app/models/item.model';
import { ItemImageService } from 'src/app/services/item-image.service';
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
  itemId: string;
  itemCategory: string;

  isAdd: boolean = false;
  isEdit: boolean = false;
  isUploaded: boolean = false;
  isUploading: boolean = false;
  isImage: boolean = false;
  isSubmitted: boolean = false;
  fileSizeExceeded: boolean = false;
  showDeleteBtn: boolean = false;

  onSuccessText: string = '';
  submitBtnText: string;
  addAnotherItemBtnText: string;
  unknownErrorText: string = '';
  previewPath: string = '';

  imageUrlSub: Subscription;

  validImageTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg'];

  item: Item = {
    id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    addedOn: '',
    modifiedOn: '',
    isAvailable: true
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemImageService: ItemImageService,
    private itemDataService: ItemDataService
  ) {
    //
    this.isAdd = false;
    this.isEdit = false;
    this.isUploaded = false;
    this.isUploading = false;
    this.isImage = false;
    this.isSubmitted = false;
    this.fileSizeExceeded = false;
    this.showDeleteBtn = false;
    this.selectedFile = null;
    //
  }

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
      itemImage: new FormControl(''),
    });

    // get data from route
    this.route.data.subscribe((data: Data) => {
      this.selectedPath = data['path'];
      this.submitBtnText =
        this.selectedPath === 'edit' ? 'Update item' : 'Add item';
      this.isAdd = this.selectedPath === 'add' ? true : false;
      this.isEdit = this.selectedPath === 'edit' ? true : false;
    });

    // get value of path variables from route
    this.route.params.subscribe((value) => {
      this.itemId = value['itemId'];
      this.itemCategory = value['itemCategory'];
    });

    // if it is edit
    if (this.isEdit == true) {
      this.initializeForItemEdit();
    }
  }

  async initializeForItemEdit() {
    this.item = (await this.itemDataService.getItemById(
      this.itemCategory,
      this.itemId
    )) as Item;

    this.addOrEditItemsForm.patchValue({
      itemTitle: this.replaceUndefinedOrNull(this.item.name),
      itemDesc: this.replaceUndefinedOrNull(this.item.description),
      itemPrice: this.replaceUndefinedOrNull(this.item.price),
      itemCategory: this.replaceUndefinedOrNull(this.item.category),
    });

    this.previewPath = this.item.imageUrl;
    this.imageUrl = this.item.imageUrl;
    this.fileSizeExceeded = false;
    this.isImage = true;
    this.showDeleteBtn = true;
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
    // handle the case when disabled attribute for add item button is deleted
    // from html
    if (this.isAdd) {
      if (
        this.addOrEditItemsForm.invalid == true ||
        this.isImage == false ||
        this.fileSizeExceeded == true
      ) {
        return;
      }
    }

    // call to uploadImage() uploads the selected image and fetches the image URL
    // and then it pushes the item data to Firebase DB
    if (this.isAdd == true && this.selectedFile != null) {
      this.uploadImage();
    }

    // if a new image file is selected on edit page
    // we delete the previous image
    // and upload the new image
    // and update the item data
    if (
      this.selectedFile != null &&
      this.isEdit == true &&
      this.item.imageUrl == ''
    ) {
      this.uploadImage();
    } else if (
      this.selectedFile != null &&
      this.isEdit == true &&
      this.item.imageUrl != ''
    ) {
      this.performDeleteImage();
      this.uploadImage();
    } else if (this.selectedFile == null && this.isEdit) {
      this.updateItemData();
    }
  }

  private uploadImage(): void {
    const category = this.addOrEditItemsForm.get('itemCategory').value;

    this.isUploading = true;

    this.itemImageService.pushImageToStorage(this.file, category).subscribe(
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
    this.imageUrlSub = this.itemImageService
      .getimageUrlObservable()
      .subscribe((url) => {
        if (url != '' && url != null && url != undefined) {
          this.imageUrl = url;
          // unsubscribe here so that pushItemData() isn't called more than once
          this.imageUrlSub.unsubscribe();
          if (this.isAdd) {
            this.pushItemData();
          } else if (this.isEdit) {
            this.updateItemData();
          }
        }
      });
  }

  // saves item data in Firebase DB
  private pushItemData() {
    this.item.name = this.addOrEditItemsForm.get('itemTitle').value;
    this.item.description = this.addOrEditItemsForm.get('itemDesc').value;
    this.item.price = this.addOrEditItemsForm.get('itemPrice').value;
    this.item.category = this.addOrEditItemsForm.get('itemCategory').value;
    this.item.imageUrl = this.imageUrl;
    this.item.addedOn = new Date().toLocaleString();

    this.itemDataService.addItemData(this.item).subscribe(
      (response) => {
        if (response != null) {
          this.isSubmitted = true;
          this.onSuccessText = 'Item added!';
          this.addAnotherItemBtnText = 'Add another item';
          // Firebase returns an unique identifier on adding some data via POST request
          // We fetch it from response.name
          this.itemDataService.setItemId(response.name);
        }
      },
      (error) => {
        this.unknownErrorText = error;
        this.isSubmitted = false;
        this.addAnotherItemBtnText = 'Try again?';
      }
    );
  }

  // updates item data
  updateItemData() {
    this.item.name = this.addOrEditItemsForm.get('itemTitle').value;
    this.item.description = this.addOrEditItemsForm.get('itemDesc').value;
    this.item.price = this.addOrEditItemsForm.get('itemPrice').value;
    this.item.category = this.addOrEditItemsForm.get('itemCategory').value;
    this.item.imageUrl = this.imageUrl;
    this.item.modifiedOn = new Date().toLocaleString();

    this.performItemDataUpdate(this.item)
      .then((res) => {
        this.isSubmitted = true;
        this.onSuccessText = 'Item updated!';
      })
      .catch((error) => {
        this.unknownErrorText = error;
        this.isSubmitted = false;
      });
  }

  async performItemDataUpdate(item: Item) {
    await this.itemDataService.updateItemData(
      item,
      this.itemCategory,
      this.itemId
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

    if (this.isAdd) {
      this.submitBtnText = 'Add item';
    }

    if (this.isEdit) {
      this.submitBtnText = 'Update item';
    }

    this.unknownErrorText = '';
    this.previewPath = '';
    this.onSuccessText = '';

    this.item = {
      id: '',
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: '',
      addedOn: '',
      modifiedOn: '',
      isAvailable: true
    };
  }

  onDeleteImage() {
    if (this.isEdit != true && this.showDeleteBtn != true) {
      return;
    }
    this.performDeleteImage();
  }

  async performDeleteImage() {
    await this.itemImageService
      .deleteImage(this.item.imageUrl)
      .then(() => {
        // only when no image file selected
        // hide image preview
        if (this.selectedFile == null) {
          this.previewPath = '';
          this.showDeleteBtn = false;
          this.item.imageUrl = '';
        }
      })
      .catch(() => {
        this.unknownErrorText = 'Some error occurred while deleting image.';
      });

    await this.itemDataService.deleteImageUrl(this.item.category, this.itemId);
  }

  onDeleteItem() {
    if (this.isEdit != true && this.showDeleteBtn != true) {
      return;
    }

    this.performDeleteItem();
  }

  async performDeleteItem() {
    // first delete the thumbnail image and then delete the item data
    if (this.previewPath != '') {
      await this.performDeleteImage();
    }

    await this.itemDataService
      .deleteItemData(this.item.category, this.item.id)
      .then(() => {
        this.onSuccessText = 'Item deleted!';

        setTimeout(() => {
          this.router.navigate(['admin/items']);
        }, 1500);
      })
      .catch(() => {
        this.unknownErrorText = 'Some error occurred while deleting item.';
      });
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */

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

  hideResponseTexts() {
    this.unknownErrorText = '';
    this.onSuccessText = '';
  }

  replaceUndefinedOrNull(v: any): string {
    if (v == undefined || v == null) {
      return '';
    }
    return v;
  }
}
