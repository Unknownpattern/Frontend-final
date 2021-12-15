import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuthReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule,
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
  ],
})
export class AuthModule {}
