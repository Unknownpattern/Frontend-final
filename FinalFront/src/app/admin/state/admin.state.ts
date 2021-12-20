import { AdminItem, AdminUsers } from 'src/app/models/adminData.model';

export interface AdminState {
  items: AdminItem[];
  users: AdminUsers[];
}
export const initialState: AdminState = {
  items: [],
  users: [],
};
