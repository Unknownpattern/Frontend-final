import { AddItemComponent } from './add-item/add-item.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DisplayListsComponent } from './display-lists/display-lists.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DisplayUsersComponent } from './display-users/display-users.component';
import { ADMIN_STATE_NAME } from './state/admin.selector';
import { AdminReducer } from './state/admin.reducer';
import { AdminEffects } from './state/admin.effects';
import { MatTableModule } from '@angular/material/table';
import { EditUserComponent } from './edit-user/edit-user.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: 'EditItem/:id', component: EditProductComponent },
          { path: 'AddItem', component: AddItemComponent },
          { path: 'ViewDetail/:id', component: ShowDetailComponent },
          { path: 'EditUser/:id', component: EditUserComponent },
        ],
      },
      // {path: 'addItem', component: }
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    DisplayListsComponent,
    EditProductComponent,
    ShowDetailComponent,
    DisplayUsersComponent,
    EditUserComponent,
    AddItemComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    StoreModule.forFeature(ADMIN_STATE_NAME, AdminReducer),
    EffectsModule.forFeature([AdminEffects]),
    MatTableModule,
  ],
})
export class AdminModule {}
