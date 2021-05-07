import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {RippleModule} from 'primeng/ripple';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderImageComponent } from './home/header-image/header-image.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { HomeComponent } from './home/home.component';
import { StartersComponent } from './starters/starters.component';
import { LoaderComponent } from './global/loader/loader.component';
import { MainsComponent } from './mains/mains.component';
import { AlcoholicBeveragesComponent } from './alcoholic-beverages/alcoholic-beverages.component';
import { DessertsComponent } from './desserts/desserts.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderImageComponent,
    CategoriesComponent,
    HomeComponent,
    StartersComponent,
    LoaderComponent,
    MainsComponent,
    AlcoholicBeveragesComponent,
    DessertsComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    RippleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
