import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Existing Login API
  login(email: string, password: string): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      return of({ email, id: '12345' });
    } else {
      return throwError(() => new Error('Invalid login credentials'));
    }
  }

  // New Register API (Added)
  register(email: string, password: string): Observable<any> {
    if (email && password) {
      return of({ email, id: Math.random().toString(36).substr(2, 9) });
    } else {
      return throwError(() => new Error('Registration failed!'));
    }
  }
}
