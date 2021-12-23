import { AuthData } from './../../models/authData.model';
import {
  setLoadingSpinner,
  setMessage,
} from './../../shared/state/shared.actions';
import { AuthService } from '../../service/auth.service';
import {
  autoLogin,
  loginFail,
  loginStart,
  loginSuccess,
  logout,
  registerStart,
  registerSuccess,
} from './auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { HttpResponseBase } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user.model';
@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          }),
          catchError((errorRes: HttpResponseBase) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            console.log(errorRes);
            if (errorRes.status === 401) {
              return of(setMessage({ message: 'Incorrect email or password' }));
            } else {
              return of(
                setMessage({
                  message: 'Server error, please try again later',
                })
              );
            }
          })
        );
      })
    );
  });

  register$ = createEffect(() => {
    return this.action$.pipe(
      ofType(registerStart),
      exhaustMap((action) => {
        return this.authService
          .register(action.email, action.password, action.name)
          .pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              const user = this.authService.formatUser(data);
              console.log(user);
              return registerSuccess({ user });
            }),
            catchError((errRes: HttpResponseBase) => {
              console.log(errRes);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              if (
                errRes.status === 401 &&
                (errRes as any).error === 'Invalid Email'
              ) {
                return of(
                  setMessage({
                    message: "Email doesn't meet requirement!",
                  })
                );
              }
              if (errRes.status === 401) {
                return of(setMessage({ message: 'User already exist!' }));
              } else {
                return of(
                  setMessage({
                    message: 'Server error, please try again later',
                  })
                );
              }
            })
          );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(autoLogin),
      map(() => {
        const helper = new JwtHelperService();
        const userToken = this.authService.getUserFromLocalStorage();
        if (userToken && !helper.isTokenExpired(userToken)) {
          const { user }: any = helper.decodeToken(userToken);
          const newUser = new User(
            user.user_email,
            user.tokenResult,
            userToken,
            user.user_name,
            user.is_admin
          );

          return loginSuccess({ user: newUser });
        }
        this.authService.clearUser();
        return loginFail();
      })
    );
  });

  logout$ = createEffect(() => {
    return this.action$.pipe(
      ofType(logout),
      exhaustMap(() => {
        localStorage.removeItem('user');
        return of(setMessage({ message: 'User successfully logged out' }));
      })
    );
  });
}
