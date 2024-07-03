import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CurrencyPipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    CurrencyPipe,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)]
};
