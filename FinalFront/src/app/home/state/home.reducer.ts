import { HomeLoadedAll, HomeLoadProductsSuccess } from './home.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './home.state';

const _HomeReducer = createReducer(
  initialState,
  on(HomeLoadProductsSuccess, (state, action) => {
    return {
      ...state,
      productList: [...state.productList, ...action.newProducts],
      pageNumber: state.pageNumber + 1,
    };
  }),
  on(HomeLoadedAll, (state, actions) => {
    return {
      ...state,
      LoadedAll: actions.loadedAll,
    };
  })
);

export function HomeReducer(state: any, action: any) {
  return _HomeReducer(state, action);
}
