import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.state';

export const HOME_STATE_NAME = 'home';

const getHomeState = createFeatureSelector<HomeState>(HOME_STATE_NAME);

export const getAllItems = createSelector(getHomeState, (state) => {
  return state.productList;
});
export const getLoadedAll = createSelector(getHomeState, (state) => {
  return state.LoadedAll;
});
export const getPageNumber = createSelector(getHomeState, (state) => {
  return state.pageNumber;
});
