import { loginSuccess, logout, registerSuccess } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    localStorage.setItem('user', action.user.token);
    return {
      ...state,
      user: action.user,
    };
  }),
  on(registerSuccess, (state, action) => {
    localStorage.setItem('user', action.user.token);
    return {
      ...state,
      user: action.user,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);
export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
