import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlcoholicBeveragesComponent } from './alcoholic-beverages/alcoholic-beverages.component';
import { AppComponent } from './app.component';
import { DessertsComponent } from './desserts/desserts.component';
import { HeaderImageComponent } from './home/header-image/header-image.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainsComponent } from './mains/mains.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { StartersComponent } from './starters/starters.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'starters',
    component: StartersComponent
  },
  {
    path: 'mains',
    component: MainsComponent
  },
  {
    path: 'alcoholic-beverages',
    component: AlcoholicBeveragesComponent
  },
  {
    path: 'desserts',
    component: DessertsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
