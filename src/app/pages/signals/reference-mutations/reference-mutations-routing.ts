import { Routes } from '@angular/router';

export const REFERENCE_MUTATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./reference-mutations').then((m) => m.ReferenceMutationsComponent),
    children: [
      { path: '', redirectTo: 'object-mutations', pathMatch: 'full' },
      {
        path: 'object-mutations',
        loadComponent: () => import('./object-mutations').then((m) => m.ObjectMutationsComponent),
      },
      {
        path: 'array-mutations',
        loadComponent: () => import('./array-mutations').then((m) => m.ArrayMutationsComponent),
      },
      {
        path: 'custom-equal',
        loadComponent: () => import('./custom-equal').then((m) => m.CustomEqualComponent),
      },
    ],
  },
];
