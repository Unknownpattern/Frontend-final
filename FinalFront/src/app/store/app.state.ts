import { AuthState } from './../auth/state/auth.state';
import { SharedState } from './../shared/state/shared.state';
import { SHARED_STATE_NAME } from './../shared/state/shared.selector';
import { SharedReducer } from '../shared/state/shared.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthReducer } from '../auth/state/auth.reducer';
import { HOME_STATE_NAME } from '../home/state/home.selector';
import { HomeState } from '../home/state/home.state';
import { HomeReducer } from '../home/state/home.reducer';
import { CART_STATE_NAME } from '../cart/state/cart.selector';
import { CartState } from '../cart/state/cart.state';
import { CartReducer } from '../cart/state/cart.reducers';
export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  [HOME_STATE_NAME]: HomeState;
  [CART_STATE_NAME]: CartState;
}
export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [HOME_STATE_NAME]: HomeReducer,
  [CART_STATE_NAME]: CartReducer,
};
