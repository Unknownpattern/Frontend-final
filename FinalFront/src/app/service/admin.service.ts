import { AdminItem, AdminUsers } from './../models/adminData.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'http://localhost:5000/api';
  constructor(private httpClient: HttpClient) {}

  getItems() {
    const url = this.baseUrl + '/admin/getItems';
    return this.httpClient.get<AdminItem[]>(url);
  }
  getUsers() {
    const url = this.baseUrl + '/admin/getUsers';
    return this.httpClient.get<AdminUsers[]>(url);
  }
  editItem(item: AdminItem) {
    const url = this.baseUrl + '/admin/updateItem';
    return this.httpClient.post<AdminItem>(url, { item: item });
  }
  deleteItem(id: number) {
    const url = this.baseUrl + '/admin/deleteItem/' + id;
    return this.httpClient.delete(url);
  }
  addItem(item: AdminItem) {
    const url = this.baseUrl + '/admin/addItem';
    return this.httpClient.post<AdminItem>(url, { item: item });
  }
}
