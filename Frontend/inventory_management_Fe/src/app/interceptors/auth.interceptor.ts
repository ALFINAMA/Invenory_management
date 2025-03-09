import { Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.reducer';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<{ auth: AuthState }>);
  let token: string | null = null;

  store.select('auth').subscribe((state) => {
    token = state.user?.token || null;
  });

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req);
};