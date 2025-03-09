import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { logout } from '../../../store/auth/auth.actions';
import { selectHideNavbar, selectIsUserLoggedIn } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  store = inject(Store)
  isUserLoggedIn = false;
  isMenuOpen = false;
  hideNavbar = false; 

  constructor(private router: Router, private authService: AuthService) {
    this.store.select('auth').subscribe((state) => {
      this.isUserLoggedIn = !!state.user;
      this.hideNavbar = state.hideNavbar;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Toggle menu state
  }
  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
