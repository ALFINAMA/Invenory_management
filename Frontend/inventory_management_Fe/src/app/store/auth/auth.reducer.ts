import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,

  // Existing Login Reducers
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // New Register Reducers (Added)
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
