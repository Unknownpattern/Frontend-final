import { getPageNumber } from './home.selector';
import { HomeService } from './../../service/home.service';
import {
  HomeLoadedAll,
  HomeLoadProducts,
  HomeLoadProductsSuccess,
} from './home.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { setMessage } from 'src/app/shared/state/shared.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private store: Store<AppState>
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomeLoadProducts),
      mergeMap((action) => {
        return this.homeService.getItems(action.page, action.pageSize).pipe(
          map((value) => {
            console.log('here');
            if (value.length === 0) {
              return HomeLoadedAll({ loadedAll: true });
            }
            return HomeLoadProductsSuccess({ newProducts: value });
          }),
          catchError((err) => {
            console.log(err);
            return of(setMessage({ message: 'something went wrong' + err }));
          })
        );
      })
    );
  });
}
