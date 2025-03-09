import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const initialState = { auth: { user: null, error: null } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegisterComponent, ReactiveFormsModule ],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display error message when passwords do not match', () => {
    component.registerForm.setValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password321'
    });
    component.onSubmit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error-message').textContent).toContain('Passwords do not match!');
  });
});
