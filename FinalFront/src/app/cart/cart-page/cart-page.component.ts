import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getUser } from 'src/app/auth/state/auth.selector';
import { CartItem } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.state';
import { RemoveItemFromCart } from '../state/cart.actions';
import { getCart } from '../state/cart.selector';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  value!: Observable<CartItem[]>;
  userSub!: Subscription;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.store.select(getUser).subscribe((value) => {
      if (!value?.isAdmin) {
        this.router.navigateByUrl('/auth/login');
      }
    });
    this.value = this.store.select(getCart);
  }

  onDelete(item: CartItem) {
    this.store.dispatch(RemoveItemFromCart({ id: item.item_id }));
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
