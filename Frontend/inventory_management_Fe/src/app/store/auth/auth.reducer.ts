import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  error: string | null;
}

const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loginSuccess, (state, { user }) => {
    localStorage.setItem('user', JSON.stringify(user));
    return { ...state, user, error: null };
  }),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(AuthActions.logout, () => {
    localStorage.removeItem('user');
    return { user: null, error: null };
  }),

  on(AuthActions.registerSuccess, (state, { user }) => {
    localStorage.setItem('user', JSON.stringify(user));
    return { ...state, user, error: null };
  }),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
