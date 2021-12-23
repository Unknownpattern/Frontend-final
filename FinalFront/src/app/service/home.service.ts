import { CartInterface } from './../models/user.model';
import { CartItem } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeItem } from '../models/homeData.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}
  getItems(page: number, pageSize: number) {
    const url =
      this.baseUrl + '/general/getData' + `?page=${page}&limit=${pageSize}`;
    return this.http.get<HomeItem[]>(url);
  }
  getCart() {
    const url = this.baseUrl + '/user/getCart';
    return this.http.get<CartItem[]>(url);
  }
  updateCart(item: CartInterface) {
    const url = this.baseUrl + '/user/updateCart';
    return this.http.patch<CartInterface>(url, {
      item_id: item.item_id,
      cart_quantity: item.cart_quantity,
    });
  }
  addCart(item: CartInterface) {
    const url = this.baseUrl + '/user/addCart';
    return this.http.post<CartItem>(url, {
      item_id: item.item_id,
      cart_quantity: item.cart_quantity,
    });
  }
  removeItem(id: number) {
    const url = this.baseUrl + '/user/removeCartItem';
    return this.http.request('delete', url, { body: { item_id: id } });
  }
}
