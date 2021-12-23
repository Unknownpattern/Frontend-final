import {
  AddItemsToCartSuccess,
  GetCartSuccess,
  RemoveItemFromCartSuccess,
  UpdateCartItemSuccess,
} from './cart.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './cart.state';

const _cartReducer = createReducer(
  initialState,
  on(GetCartSuccess, (state, action) => {
    return {
      ...state,
      cartItems: action.cart,
    };
  }),
  on(AddItemsToCartSuccess, (state, action) => {
    return {
      ...state,
      cartItems: [...state.cartItems, action.item],
    };
  }),
  on(RemoveItemFromCartSuccess, (state, action) => {
    let newCart = state.cartItems.filter((value) => {
      return value.item_id !== action.id;
    });
    return {
      ...state,
      cartItems: newCart,
    };
  }),
  on(UpdateCartItemSuccess, (state, action) => {
    let newCart = state.cartItems.map((value) => {
      if (value.item_id !== action.newItem.item_id) {
        return value;
      } else {
        let newCartItem = { ...value };
        newCartItem.cart_quantity = action.newItem.cart_quantity;
        return newCartItem;
      }
    });
    return {
      ...state,
      cartItems: newCart,
    };
  })
);

export function CartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
