import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog'
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import Aura from '@primeng/themes/aura';
import { myPreset } from '../styles/my-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideAnimationsAsync(),
    DialogService,
    importProvidersFrom(DialogModule),
    MessageService,
    providePrimeNG({
      theme: {
        preset: myPreset
      }
    })
  ]
};
