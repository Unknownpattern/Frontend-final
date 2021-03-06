import { getLoading, getErrorMessage } from './../../state/shared.selector';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getUser } from 'src/app/auth/state/auth.selector';
import { logout } from 'src/app/auth/state/auth.actions';
import { getCart } from 'src/app/cart/state/cart.selector';
import { CartItem } from 'src/app/models/user.model';
import { GetCart } from 'src/app/cart/state/cart.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  showLoading$!: Observable<boolean>;
  name: string = '';
  hasUser = false;
  isAdmin = false;
  cartItems!: Observable<CartItem[]>;
  userSubscription!: Subscription;
  errorMessage!: Subscription;

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage = this.store
      .select(getErrorMessage)
      .subscribe((message) => {
        if (message === '') {
          return;
        }
        this._snackBar.open(message, 'Close', { duration: 5000 });
      });
    this.userSubscription = this.store.select(getUser).subscribe((user) => {
      if (user) {
        this.store.dispatch(GetCart());
        this.name = user.name;
        this.hasUser = true;
        this.isAdmin = user.isAdmin;
      } else {
        this.name = '';
        this.hasUser = false;
        this.isAdmin = false;
      }
    });
    this.cartItems = this.store.select(getCart);
  }
  onLogOut() {
    this.store.dispatch(logout());
  }
  ngOnDestroy() {
    this.errorMessage.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
