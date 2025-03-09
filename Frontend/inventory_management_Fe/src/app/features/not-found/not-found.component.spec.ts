import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { CommonModule } from '@angular/common';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthState } from '../../store/auth/auth.reducer';
import { logout } from '../../store/auth/auth.actions';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let store: MockStore<{ auth: AuthState }>;
  let router: Router;

  const initialState: AuthState = {
    user: null,
    error: null,
    hideNavbar: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, NotFoundComponent], // Import the standalone component here
      providers: [
        provideMockStore({ initialState }), // Provide the mock store with initial state
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch logout action on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });

  it('should navigate to home on button click', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should display 404 message', () => {
    const messageElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(messageElement.textContent).toContain('404');
  });

  it('should display error message', () => {
    const messageElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(messageElement.textContent).toContain("Oops! The page you're looking for doesn't exist.");
  });
});
