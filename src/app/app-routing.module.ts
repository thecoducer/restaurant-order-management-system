import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderImageComponent } from './home/header-image/header-image.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './global/navbar/navbar.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DisplayItemsComponent } from './admin/manage-items/display-items/display-items.component';
import { AddOrEditItemsComponent } from './admin/manage-items/add-or-edit-items/add-or-edit-items.component';
import { ManageItemsComponent } from './admin/manage-items/manage-items.component';
import { NotFoundComponent } from './global/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: 'profile/:name',
    component: UserProfileComponent,
  },
  {
    path: 'admin/items',
    component: DisplayItemsComponent,
  },
  {
    path: 'admin/items/add',
    component: AddOrEditItemsComponent,
    data: { path: 'add' },
  },
  {
    path: 'admin/items/edit/:itemId',
    component: AddOrEditItemsComponent,
    data: { path: 'edit' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    //redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
