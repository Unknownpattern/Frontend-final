export class User {
  constructor(
    public email: string,
    public id: string,
    public token: string,
    public name: string,
    public isAdmin: boolean
  ) {}
}
export interface Cart {
  cartItems: CartItem[];
}

export interface CartItem {
  item_id: number;
  item_price: number;
  item_name: number;
  item_quantity: number;
  item_description: string;
  cart_quantity: number;
}

export interface CartInterface {
  cart_quantity: number;
  item_id: number;
}
