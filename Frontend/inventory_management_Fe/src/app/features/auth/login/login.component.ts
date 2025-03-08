import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from '../../../store/auth/auth.actions';
import { take } from 'rxjs/internal/operators/take';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private store: Store<{ auth: any }>, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.store
      .select((state) => state.auth.user)
      .pipe(filter((user) => !!user)) 
      .subscribe(() => {
        console.log('✅ Login successful! Redirecting to Dashboard...');
        this.router.navigate(['/dashboard']);
      });

    this.store.select((state) => state.auth.error).subscribe((error) => {
      this.errorMessage = error;
    });
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
}
