import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient,} from '@angular/common/http';
import {JwtInterceptor} from '../services/jwt-interceptor.service';
import {AuthService} from '../services/Auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, deps: [AuthService], multi: true},
  ]
};
