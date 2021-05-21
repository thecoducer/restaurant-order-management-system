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
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { environment } from 'src/environments/environment';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddOrEditItemsComponent } from './admin/add-or-edit-items/add-or-edit-items.component';
import { DisplayItemsComponent } from './admin/display-items/display-items.component';
import { NotFoundComponent } from './global/not-found/not-found.component';
import { StartersIconComponent } from './global/starters-icon/starters-icon.component';
import { MainsIconComponent } from './global/mains-icon/mains-icon.component';
import { DrinksIconComponent } from './global/drinks-icon/drinks-icon.component';
import { DessertsIconComponent } from './global/desserts-icon/desserts-icon.component';
import { CartIconComponent } from './global/cart-icon/cart-icon.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AuthGuard } from './route-guards/auth-guard.service';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { DisplayOrdersComponent } from './admin/display-orders/display-orders.component';

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
    AddOrEditItemsComponent,
    DisplayItemsComponent,
    NotFoundComponent,
    StartersIconComponent,
    MainsIconComponent,
    DrinksIconComponent,
    DessertsIconComponent,
    CartIconComponent,
    OrderPageComponent,
    ConfirmOrderComponent,
    ManageOrdersComponent,
    DisplayOrdersComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
