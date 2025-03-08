import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { authReducer } from './app/store/auth/auth.reducer';
import { AuthEffects } from './app/store/auth/auth.effects'; // ✅ Import AuthEffects
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideStoreDevtools } from '@ngrx/store-devtools'; // ✅ Import Redux DevTools
import { isDevMode } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()), // ✅ Enables component input bindings
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]), // ✅ Add AuthEffects to handle login/register
    provideCharts(withDefaultRegisterables()),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(),}) // ✅ Enable Redux DevTools

  ],
}).catch(err => console.error(err));
