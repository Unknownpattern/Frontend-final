import { AuthState } from './auth.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const AUTH_STATE_NAME = 'auth';

const getUserState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getUser = createSelector(getUserState, (state) => {
  return state.user;
});

export const isAuthenticated = createSelector(getUserState, (state) => {
  return state.user ? true : false;
});
