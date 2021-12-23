import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRouteGuardService } from './http/admin-route-guard.service';
import { CartPageComponent } from './cart/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AdminRouteGuardService],
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
