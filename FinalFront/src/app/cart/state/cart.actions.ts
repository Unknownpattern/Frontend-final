import { CartItem, CartInterface } from './../../models/user.model';
import { createAction, props } from '@ngrx/store';
export const GET_CART = '[cart action] get cart';
export const GET_CART_SUCCESS = '[cart action] get cart success';

export const UPDATE_CART_ITEM = '[cart action] update cart item';
export const UPDATE_CART_ITEM_SUCCESS =
  '[cart action] update cart item success';
export const ADD_ITEMS_TO_CART_SUCCESS = '[cart action] add item success';
export const REMOVE_ITEM_FROM_CART = '[cart action] remove item';
export const REMOVE_ITEM_FROM_CART_SUCCESS =
  '[cart action] remove item success';

export const AddItemsToCartSuccess = createAction(
  ADD_ITEMS_TO_CART_SUCCESS,
  props<{ item: CartItem }>()
);
export const GetCart = createAction(GET_CART);
export const GetCartSuccess = createAction(
  GET_CART_SUCCESS,
  props<{ cart: CartItem[] }>()
);
export const RemoveItemFromCart = createAction(
  REMOVE_ITEM_FROM_CART,
  props<{ id: number }>()
);
export const RemoveItemFromCartSuccess = createAction(
  REMOVE_ITEM_FROM_CART_SUCCESS,
  props<{ id: number }>()
);
export const UpdateCartItem = createAction(
  UPDATE_CART_ITEM,
  props<{ newItem: CartInterface }>()
);
export const UpdateCartItemSuccess = createAction(
  UPDATE_CART_ITEM_SUCCESS,
  props<{ newItem: CartInterface }>()
);
