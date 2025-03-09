
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideStoreDevtools } from '@ngrx/store-devtools'; // ✅ Import Redux DevTools
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(appRoutes, withComponentInputBinding()), 
  provideStore({ auth: authReducer }),
  provideEffects([AuthEffects]),
  provideCharts(withDefaultRegisterables()),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), }) 
  ]
};
