import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsUserLoggedIn = createSelector(
  selectAuthState,
  (state) => !!state.user
);

export const selectHideNavbar = createSelector(
  selectAuthState,
  (state) => state.hideNavbar
);
