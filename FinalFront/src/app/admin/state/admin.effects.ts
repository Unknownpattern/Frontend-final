import { HttpResponseBase } from '@angular/common/http';
import { AdminItem, AdminUsers } from 'src/app/models/adminData.model';
import {
  adminAddItem,
  adminAddItemSuccess,
  adminDeleteItem,
  adminDeleteItemSuccess,
  adminEditItem,
  adminEditItemSuccess,
  adminLoadItem,
  adminLoadItemSuccess,
  adminLoadUsers,
  adminLoadUsersSuccess,
} from './admin.actions';
import { AdminService } from './../../service/admin.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setMessage } from 'src/app/shared/state/shared.actions';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private store: Store<AppState>
  ) {}

  loadItems$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(adminLoadItem),
        mergeMap((action) => {
          return this.adminService.getItems().pipe(
            map((Items: AdminItem[]) => {
              this.store.dispatch(adminLoadItemSuccess({ items: Items }));
            }),
            catchError((errRes: HttpResponseBase) => {
              return of(setMessage({ message: 'Something went wrong' }));
            })
          );
        })
      );
    },
    { dispatch: false }
  );
  loadUsers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(adminLoadUsers),
        mergeMap((action) => {
          return this.adminService.getUsers().pipe(
            map((users) => {
              this.store.dispatch(adminLoadUsersSuccess({ users: users }));
            }),
            catchError((errRes: HttpResponseBase) => {
              return of(setMessage({ message: 'Something went wrong' }));
            })
          );
        })
      );
    },
    { dispatch: false }
  );
  editItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminEditItem),
      mergeMap((action) => {
        return this.adminService.editItem(action.item).pipe(
          map((item) => {
            return adminEditItemSuccess({ item });
          }),
          catchError(() => {
            return of(setMessage({ message: 'Something went wrong' }));
          })
        );
      })
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminDeleteItem),
      mergeMap((action) => {
        return this.adminService.deleteItem(action.id).pipe(
          map((res: any) => {
            if (res.message === 'done') {
              return adminDeleteItemSuccess({ id: action.id });
            }
            return setMessage({ message: 'Something went wrong' });
          }),
          catchError((res: any) => {
            console.log(res);
            return of(
              setMessage({ message: 'Something went wrong, ' + res.message })
            );
          })
        );
      })
    );
  });

  AddItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminAddItem),
      mergeMap((action) => {
        return this.adminService.addItem(action.item).pipe(
          map((item) => {
            return adminAddItemSuccess({ item: item });
          }),
          catchError((err) => {
            console.log(err);
            return of(setMessage({ message: 'something went wrong, ' + err }));
          })
        );
      })
    );
  });
}
