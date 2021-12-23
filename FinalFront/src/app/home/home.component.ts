import { isAuthenticated } from './../auth/state/auth.selector';
import { HomeLoadProducts } from './state/home.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  getAllItems,
  getPageNumber,
  getLoadedAll,
} from './state/home.selector';
import { first, Observable, Subscription } from 'rxjs';
import { HomeItem } from '../models/homeData.model';
import { setMessage } from '../shared/state/shared.actions';
import { UpdateCartItem } from '../cart/state/cart.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pageNumber = 1;
  pageSize = 10;
  itemList$!: Observable<HomeItem[]>;
  loginSub!: Subscription;
  pageLoadSub!: Subscription;
  isLoggedIn = false;
  gotEverything = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.itemList$ = this.store.select(getAllItems);
    this.loginSub = this.store.select(isAuthenticated).subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.pageLoadSub = this.store.select(getLoadedAll).subscribe((value) => {
      this.gotEverything = value;
    });
  }

  onScroll() {
    if (!this.gotEverything) {
      this.store
        .select(getPageNumber)
        .pipe(first())
        .subscribe((PageNumber) => {
          this.store.dispatch(
            HomeLoadProducts({ page: PageNumber, pageSize: 10 })
          );
        });
    }
  }
  addToCart(values: { amount: number; id: number }) {
    if (this.isLoggedIn) {
      this.store.dispatch(
        UpdateCartItem({
          newItem: { item_id: values.id, cart_quantity: values.amount },
        })
      );
    } else {
      this.store.dispatch(
        setMessage({ message: 'User must be logged in to add items to cart!' })
      );
    }
  }
  ngOnDestroy(): void {
    this.pageLoadSub.unsubscribe();
    this.loginSub.unsubscribe();
  }
}
