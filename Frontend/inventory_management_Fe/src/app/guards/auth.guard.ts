import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.reducer';
import { map } from 'rxjs/operators';
import { logout, setNavbarVisibility } from '../store/auth/auth.actions';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store<{ auth: AuthState }>);
  const router = inject(Router);

  return store.select('auth').pipe(
    map((state) => {
      if (state.user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};