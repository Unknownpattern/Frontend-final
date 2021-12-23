import { CartEffects } from './cart/state/cart.effects';
import { HomeEffects } from './home/state/home.effect';
import { appReducer } from './store/app.state';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthEffects } from './auth/state/auth.effects';
import { AuthTokenInterceptor } from './http/interceptor';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeItemComponent } from './home/home-item/home-item.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartPageComponent } from './cart/cart-page/cart-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeItemComponent,
    CartPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AuthEffects, HomeEffects, CartEffects]),
    InfiniteScrollModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
