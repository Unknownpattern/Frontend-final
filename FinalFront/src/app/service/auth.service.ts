import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000';
  constructor(private httpClient: HttpClient) {}
  login(email: string, password: string) {
    const url = this.baseUrl + '/api/login';
    return this.httpClient.post(url, { "email": email, "password" : password });
  }
}
