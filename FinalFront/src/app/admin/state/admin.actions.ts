import { AdminItem, AdminUsers } from 'src/app/models/adminData.model';
import { createAction, props } from '@ngrx/store';

export const ADMIN_LOAD_USERS = '[admin page] load users';
export const ADMIN_LOAD_USERS_SUCCESS = '[admin page] load users success';
export const ADMIN_LOAD_ITEMS = '[admin page] load items';
export const ADMIN_LOAD_ITEMS_SUCCESS = '[admin page] load items success';
export const ADMIN_EDIT_ITEM = '[admin page] edit item';
export const ADMIN_EDIT_ITEM_SUCCESS = '[admin page] edit item success';
export const ADMIN_DELETE_ITEM = '[admin page] delete item';
export const ADMIN_DELETE_ITEM_SUCCESS = '[admin page] delete item success';
export const ADMIN_ADD_ITEM = '[admin page] admin add item';
export const ADMIN_ADD_ITEM_SUCCESS = '[admin page] admin add item success';

export const adminLoadItem = createAction(ADMIN_LOAD_ITEMS);
export const adminLoadUsers = createAction(ADMIN_LOAD_USERS);
export const adminDeleteItem = createAction(
  ADMIN_DELETE_ITEM,
  props<{ id: number }>()
);
export const adminEditItem = createAction(
  ADMIN_EDIT_ITEM,
  props<{ item: AdminItem }>()
);
export const adminAddItem = createAction(
  ADMIN_ADD_ITEM,
  props<{ item: AdminItem }>()
);

export const adminLoadItemSuccess = createAction(
  ADMIN_LOAD_ITEMS_SUCCESS,
  props<{ items: AdminItem[] }>()
);
export const adminLoadUsersSuccess = createAction(
  ADMIN_LOAD_USERS_SUCCESS,
  props<{ users: AdminUsers[] }>()
);
export const adminEditItemSuccess = createAction(
  ADMIN_EDIT_ITEM_SUCCESS,
  props<{ item: AdminItem }>()
);
export const adminDeleteItemSuccess = createAction(
  ADMIN_DELETE_ITEM_SUCCESS,
  props<{ id: number }>()
);
export const adminAddItemSuccess = createAction(
  ADMIN_ADD_ITEM_SUCCESS,
  props<{ item: AdminItem }>()
);
