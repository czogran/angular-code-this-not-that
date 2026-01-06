import { Routes } from '@angular/router';

export const DEFAULT_VS_ONPUSH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full',
  },
  {
    path: 'default',
    loadComponent: () => import('./default/default.js').then((m) => m.DefaultComponent),
  },
  {
    path: 'onpush',
    loadComponent: () => import('./onpush/onpush.js').then((m) => m.OnpushComponent),
  },
];
