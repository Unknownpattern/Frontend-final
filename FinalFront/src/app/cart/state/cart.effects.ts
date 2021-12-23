import { CartInterface } from './../../models/user.model';
import { CartItem } from 'src/app/models/user.model';
import { map, mergeMap, of, withLatestFrom } from 'rxjs';
import { HomeService } from './../../service/home.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import {
  AddItemsToCartSuccess,
  GetCart,
  GetCartSuccess,
  RemoveItemFromCart,
  RemoveItemFromCartSuccess,
  UpdateCartItem,
  UpdateCartItemSuccess,
} from './cart.actions';
import { getCart } from './cart.selector';
import { setMessage } from 'src/app/shared/state/shared.actions';

@Injectable()
export class CartEffects {
  constructor(
    private action$: Actions,
    private homeService: HomeService,
    private store: Store<AppState>
  ) {}
  cartUpdate$ = createEffect(() => {
    return this.action$.pipe(
      ofType(UpdateCartItem),
      withLatestFrom(this.store.select(getCart)),
      mergeMap(([actions, cartItems]) => {
        console.log('a');
        const isInside = cartItems.filter((item) => {
          return item.item_id === actions.newItem.item_id;
        });
        if (isInside.length === 0) {
          return this.homeService.addCart(actions.newItem).pipe(
            map((cartItem) => {
              cartItem.cart_quantity = actions.newItem.cart_quantity;
              return AddItemsToCartSuccess({ item: cartItem });
            })
          );
        } else {
          const newItem: CartInterface = {
            item_id: actions.newItem.item_id,
            cart_quantity:
              actions.newItem.cart_quantity + isInside[0].cart_quantity,
          };
          return this.homeService.updateCart(newItem).pipe(
            map((cartItem) => {
              return UpdateCartItemSuccess({ newItem: cartItem });
            })
          );
        }
      })
    );
  });
  cartRemove$ = createEffect(() => {
    return this.action$.pipe(
      ofType(RemoveItemFromCart),
      withLatestFrom(this.store.select(getCart)),
      mergeMap(([action, cartItems]) => {
        const isInside = cartItems.filter((item) => {
          return item.item_id === action.id;
        });
        if (isInside.length >= 1) {
          return this.homeService.removeItem(action.id).pipe(
            map(() => {
              return RemoveItemFromCartSuccess({ id: action.id });
            })
          );
        } else {
          return of(setMessage({ message: 'Cannot find item in cart!' }));
        }
      })
    );
  });
  getCart$ = createEffect(() => {
    return this.action$.pipe(
      ofType(GetCart),
      mergeMap(() => {
        return this.homeService.getCart().pipe(
          map((cartItems) => {
            return GetCartSuccess({ cart: cartItems });
          })
        );
      })
    );
  });
}
