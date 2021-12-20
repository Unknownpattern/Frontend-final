import { createAction, props } from '@ngrx/store';

export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const SET_MESSAGE = '[shared state] set message';

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setMessage = createAction(
  SET_MESSAGE,
  props<{ message: string }>()
);
