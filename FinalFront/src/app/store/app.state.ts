import { AuthState } from './../auth/state/auth.state';
import { SharedState } from './../shared/state/shared.state';
import { SHARED_STATE_NAME } from './../shared/state/shared.selector';
import { SharedReducer } from '../shared/state/shared.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthReducer } from '../auth/state/auth.reducer';
export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
}
export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
};
