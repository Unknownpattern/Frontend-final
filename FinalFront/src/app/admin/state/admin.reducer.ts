import {
  adminLoadItemSuccess,
  adminLoadUsersSuccess,
  adminEditItemSuccess,
  adminDeleteItemSuccess,
  adminAddItemSuccess,
} from './admin.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './admin.state';
const _adminReducer = createReducer(
  initialState,
  on(adminLoadItemSuccess, (state, action) => {
    return {
      ...state,
      items: action.items,
    };
  }),
  on(adminLoadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.users,
    };
  }),
  on(adminEditItemSuccess, (state, action) => {
    let newArr = state.items.filter((value) => {
      if (action.item.item_id && value.item_id) {
        return +value.item_id !== +action.item.item_id;
      }
      return true;
    });
    return {
      ...state,
      items: [...newArr, action.item],
    };
  }),
  on(adminDeleteItemSuccess, (state, action) => {
    let newArr = state.items.filter((value) => {
      if (action.id && value.item_id) {
        return +value.item_id !== +action.id;
      }
      return true;
    });
    return {
      ...state,
      items: [...newArr],
    };
  }),
  on(adminAddItemSuccess, (state, action) => {
    let newArr = [...state.items, action.item];
    return {
      ...state,
      items: newArr,
    };
  })
);
export function AdminReducer(state: any, action: any) {
  return _adminReducer(state, action);
}
