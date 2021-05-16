import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './global/navbar/navbar.component';
import { HeaderImageComponent } from './home/header-image/header-image.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './global/loader/loader.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FooterComponent } from './global/footer/footer.component';
import { CartComponent } from './cart/cart.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ManageItemsComponent } from './admin/manage-items/manage-items.component';
import { AddOrEditItemsComponent } from './admin/manage-items/add-or-edit-items/add-or-edit-items.component';
import { DisplayItemsComponent } from './admin/manage-items/display-items/display-items.component';
import { NotFoundComponent } from './global/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderImageComponent,
    CategoriesComponent,
    HomeComponent,
    LoaderComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    CartComponent,
    CartPageComponent,
    CategoryPageComponent,
    UserProfileComponent,
    ManageItemsComponent,
    AddOrEditItemsComponent,
    DisplayItemsComponent,
    NotFoundComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
