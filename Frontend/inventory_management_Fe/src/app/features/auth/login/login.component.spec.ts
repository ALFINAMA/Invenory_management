import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { LoginComponent } from './login.component';
import { login, logout } from '../../../store/auth/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<{ auth: any }>;
  let router: Router;
  let mockAuthState: any;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select').and.returnValue(of(null))
  };

  beforeEach(async () => {
    mockAuthState = {
      auth: {
        user: null,
        error: null
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', (state = mockAuthState, action: Action) => {
          switch (action.type) {
            case '[Auth] Login Success':
              return { ...state, user: (action as any).user };
            case '[Auth] Login Failure':
              return { ...state, error: (action as any).error };
            default:
              return state;
          }
        }),
        LoginComponent // Include LoginComponent in the imports array
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should dispatch logout action on initialization', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });

  it('should dispatch login action on form submit', () => {
    component.ngOnInit();
    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(login({ email: 'test@example.com', password: 'password' }));
  });

  it('should navigate to /dashboard on successful login', () => {
    mockStore.select.and.returnValue(of({ email: 'test@example.com' }));
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should set errorMessage on login failure', () => {
    mockStore.select.and.returnValue(of('Login failed'));
    component.ngOnInit();
    expect(component.errorMessage).toBe('Login failed');
  });

  it('should navigate to /register when navigateToRegister is called', () => {
    component.navigateToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
