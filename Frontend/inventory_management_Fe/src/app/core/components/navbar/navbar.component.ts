import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { logout } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isUserLoggedIn = false;
  isMenuOpen = false; // Default: Menu is closed

  constructor(private router: Router, private store: Store, private authService: AuthService) {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isUserLoggedIn = loggedIn;
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
