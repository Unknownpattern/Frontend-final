export interface AdminItem {
  item_name: string;
  item_id: number | null;
  item_description: string | null;
  item_price: string;
  item_quantity: number | null;
  item_original_quantity: number;
  item_image: string | null;
}
export interface AdminUsers {
  user_id: string;
  user_name: string;
  user_email: string;
}
