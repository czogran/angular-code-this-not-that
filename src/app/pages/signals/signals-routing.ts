import { Routes } from '@angular/router';
import { REFERENCE_MUTATIONS_ROUTES } from './reference-mutations/reference-mutations-routing';

export const SIGNALS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'effects',
  },
  {
    path: 'effects',
    loadComponent: () => import('./effects/effects').then((m) => m.EffectsComponent),
  },
  {
    path: 'manual-calculations',
    loadComponent: () =>
      import('./manual-calculations/manual-calculations.js').then(
        (m) => m.ManualCalculationsComponent,
      ),
  },
  {
    path: 'reference-mutations',
    children: REFERENCE_MUTATIONS_ROUTES,
  },
];
