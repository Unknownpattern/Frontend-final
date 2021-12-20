import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';
export const REGISTER_START = '[auth page] register start';
export const REGISTER_SUCCESS = '[auth page] register success';
export const LOGOUT = '[auth page] logout';
export const AUTO_LOGIN = '[auth page] auto login';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const loginFail = createAction(LOGIN_FAIL);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User }>()
);
export const registerStart = createAction(
  REGISTER_START,
  props<{ email: string; password: string; name: string }>()
);

export const registerSuccess = createAction(
  REGISTER_SUCCESS,
  props<{ user: User }>()
);

export const logout = createAction(LOGOUT);

export const autoLogin = createAction(AUTO_LOGIN);
