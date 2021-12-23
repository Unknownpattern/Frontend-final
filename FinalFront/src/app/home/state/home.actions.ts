import { createAction, props } from '@ngrx/store';
import { HomeItem } from 'src/app/models/homeData.model';

export const HOME_LOAD_PRODUCTS = '[home page] load product';
export const HOME_LOAD_PRODUCTS_SUCCESS = '[home page] load product success';
export const HOME_LOADED_ALL = '[home page] no more products to load';

export const HomeLoadProducts = createAction(
  HOME_LOAD_PRODUCTS,
  props<{ page: number; pageSize: number }>()
);
export const HomeLoadProductsSuccess = createAction(
  HOME_LOAD_PRODUCTS_SUCCESS,
  props<{ newProducts: HomeItem[] }>()
);
export const HomeLoadedAll = createAction(
  HOME_LOADED_ALL,
  props<{ loadedAll: boolean }>()
);
