import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.state';

export const ADMIN_STATE_NAME = 'admin';

const getAdminState = createFeatureSelector<AdminState>(ADMIN_STATE_NAME);

export const getAllItems = createSelector(getAdminState, (state) => {
  return state.items;
});

export const getAllUsers = createSelector(getAdminState, (state) => {
  return state.users;
});
