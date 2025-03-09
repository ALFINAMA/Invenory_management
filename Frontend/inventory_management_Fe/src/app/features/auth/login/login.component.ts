import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { login, logout } from '../../../store/auth/auth.actions';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store<{ auth: any }>, private router: Router) {
    // Form initialization
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Dispatch logout action on initialization
    this.store.dispatch(logout());

    // Handle user state changes
    this.store
      .select((state) => state.auth.user)
      .pipe(
        filter((user) => !!user),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        console.log('✅ Login successful! Redirecting to Dashboard...');
        this.router.navigate(['/dashboard']);
      });

    // Handle error state changes
    this.store
      .select((state) => state.auth.error)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((error) => {
        this.errorMessage = error;
      });

    // Additional initialization logic
    // ...
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(login({ email, password }));
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
