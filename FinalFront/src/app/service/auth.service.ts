import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthData } from '../models/authData.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api';
  constructor(private httpClient: HttpClient) {}
  login(email: string, password: string): Observable<AuthData> {
    const url = this.baseUrl + '/auth/login';
    return this.httpClient.post<AuthData>(url, {
      email: email,
      password: password,
    });
  }
  formatUser(data: AuthData) {
    const user = new User(
      data.email,
      data.user_id,
      data.token,
      data.name,
      data.is_admin
    );
    return user;
  }

  register(
    email: string,
    password: string,
    name: string
  ): Observable<AuthData> {
    const url = this.baseUrl + '/auth/register';
    return this.httpClient.post<AuthData>(url, {
      email: email,
      password: password,
      name: name,
    });
  }

  getUserFromLocalStorage() {
    return localStorage.getItem('user');
  }
  clearUser() {
    localStorage.removeItem('user');
  }
  autoLogin(token: string): Observable<AuthData> {
    const url = this.baseUrl + '/auth/getUser';
    return this.httpClient.get<AuthData>(url);
  }
}
