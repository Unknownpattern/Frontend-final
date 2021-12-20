import { setMessage } from '../shared/state/shared.actions';
import { Store } from '@ngrx/store';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { AppState } from '../store/app.state';
import { getUser } from '../auth/state/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AdminRouteGuardService implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  canLoad(route: Route): Observable<boolean | UrlTree> {
    return this.store.select(getUser).pipe(
      map((user) => {
        if (!user) {
          this.store.dispatch(
            setMessage({
              message: 'Please access this page through the headers',
            })
          );
          return this.router.createUrlTree(['auth']);
        } else if (!user?.isAdmin) {
          this.store.dispatch(
            setMessage({
              message: 'User is not authorized to visit the page!',
            })
          );
          return this.router.createUrlTree(['']);
        }
        return true;
      })
    );
  }
}
