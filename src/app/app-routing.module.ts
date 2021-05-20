import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
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
import { CategoryPageComponent } from './category-page/category-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AuthGuard } from './route-guards/auth-guard.service';
import { AdminAuthGuard } from './route-guards/admin-auth-guard.service';
import { CustomerAuthGuard } from './route-guards/customer-auth-guard.service';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 100]
};

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
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/items',
    component: DisplayItemsComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/items/add',
    component: AddOrEditItemsComponent,
    data: { path: 'add' },
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/items/edit/:itemCategory/:itemId',
    component: AddOrEditItemsComponent,
    data: { path: 'edit' },
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'menu-page',
    component: CategoryPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'orders',
    component: OrderPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
