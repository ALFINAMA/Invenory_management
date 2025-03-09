import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { AuthState } from '../../store/auth/auth.reducer';

describe('AuthService', () => {
  let service: AuthService;
  let store: MockStore<{ auth: AuthState }>;

  const initialState: AuthState = {
    user: null,
    error: null,
    hideNavbar: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideMockStore({ initialState }), // Provide the mock store with initial state
      ],
    });

    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data for valid login credentials', (done) => {
    service.login('admin@gmail.com', 'admin@123').subscribe({
      next: (response) => {
        expect(response).toEqual({ email: 'admin@gmail.com', id: '12345' });
        done();
      },
      error: () => {
        fail('Expected valid login credentials to return user data');
        done();
      },
    });
  });

  it('should return error for invalid login credentials', (done) => {
    service.login('user@gmail.com', 'wrongpassword').subscribe({
      next: () => {
        fail('Expected invalid login credentials to return error');
        done();
      },
      error: (error) => {
        expect(error).toEqual(new Error('Invalid login credentials'));
        done();
      },
    });
  });

  it('should return user data for valid registration details', (done) => {
    service.register('newuser@gmail.com', 'password123').subscribe({
      next: (response) => {
        expect(response).toEqual(jasmine.objectContaining({ email: 'newuser@gmail.com' }));
        expect(response.id).toBeDefined();
        done();
      },
      error: () => {
        fail('Expected valid registration details to return user data');
        done();
      },
    });
  });

  it('should return error for missing registration details', (done) => {
    service.register('', '').subscribe({
      next: () => {
        fail('Expected missing registration details to return error');
        done();
      },
      error: (error) => {
        expect(error).toEqual(new Error('Registration failed!'));
        done();
      },
    });
  });

  it('should return true if user is logged in', (done) => {
    store.setState({
      auth: {
        user: { email: 'loggedinuser@gmail.com' },
        error: null,
        hideNavbar: false
      }
    });

    service.isLoggedIn().subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeTrue();
      done();
    });
  });

  it('should return false if user is not logged in', (done) => {
    store.setState({
      auth: {
        user: null,
        error: null,
        hideNavbar: false
      }
    });

    service.isLoggedIn().subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeFalse();
      done();
    });
  });
});
