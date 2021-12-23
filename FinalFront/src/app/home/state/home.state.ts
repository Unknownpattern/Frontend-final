import { HomeItem } from 'src/app/models/homeData.model';

export interface HomeState {
  productList: HomeItem[];
  pageNumber: number;
  LoadedAll: boolean;
}

export const initialState: HomeState = {
  productList: [],
  pageNumber: 1,
  LoadedAll: false,
};
