import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  error: string | null;
  hideNavbar: boolean;
}

const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  error: null,
  hideNavbar: false
};

export const authReducer = createReducer(
  initialState,

  // ✅ Handle Login
  on(AuthActions.loginSuccess, (state, { user }) => {
    localStorage.setItem('user', JSON.stringify(user));
    return { ...state, user, error: null, hideNavbar: false };
  }),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // ✅ Handle Logout
  on(AuthActions.logout, () => {
    localStorage.removeItem('user');
    return { user: null, error: null, hideNavbar: false };
  }),

  // ✅ Handle Registration
  on(AuthActions.registerSuccess, (state, { user }) => {
    localStorage.setItem('user', JSON.stringify(user));
    return { ...state, user, error: null, hideNavbar: false };
  }),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // ✅ Handle Navbar Visibility for 404
  on(AuthActions.setNavbarVisibility, (state, { hideNavbar }) => ({
    ...state,
    hideNavbar
  }))
);
