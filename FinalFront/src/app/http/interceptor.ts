import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('user');
    if (token) {
      let headers = { Authorization: `Bearer ${token}` };
      return next.handle(req.clone({ setHeaders: headers }));
    } else {
      return next.handle(req);
    }
  }
}
