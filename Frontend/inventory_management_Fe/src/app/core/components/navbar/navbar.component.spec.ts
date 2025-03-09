import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';
import { logout } from '../../../store/auth/auth.actions';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore;
  let router: Router;
  let authService: AuthService;

  const initialState = {
    auth: {
      user: null,
      hideNavbar: false
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: {} }
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isUserLoggedIn).toBeFalse();
    expect(component.isMenuOpen).toBeFalse();
    expect(component.hideNavbar).toBeFalse();
  });

  it('should toggle menu state', () => {
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should logout and navigate to login', () => {
    spyOn(store, 'dispatch');
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(logout());
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should update isUserLoggedIn and hideNavbar based on store state', () => {
    store.setState({
      auth: {
        user: { id: 1, name: 'Test User' },
        hideNavbar: true
      }
    });
    fixture.detectChanges();
    expect(component.isUserLoggedIn).toBeTrue();
    expect(component.hideNavbar).toBeTrue();
  });
});
