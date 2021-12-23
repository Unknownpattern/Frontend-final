import { CartItem } from 'src/app/models/user.model';

export interface CartState {
  cartItems: CartItem[];
}
export const initialState: CartState = {
  cartItems: [],
};
