import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthState } from '../../store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { logout, setNavbarVisibility } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 class="text-6xl font-bold">404</h1>
      <p class="text-xl mt-2">Oops! The page you're looking for doesn't exist.</p>
      <button (click)="goHome()" class="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200">
        Go to Home
      </button>
    </div>
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {
store = inject(Store<{ auth: AuthState }>);

  constructor(private router: Router) {}
  ngOnInit(): void {
      this.store.dispatch(logout());
      // this.store.dispatch(setNavbarVisibility({ hideNavbar: true })); 
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
