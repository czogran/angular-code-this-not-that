import { Routes } from '@angular/router';
import { VIEWCHILD_ROUTES } from './viewchild/viewchild.routes';

export const ANNOTATIONS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'input',
    pathMatch: 'full',
  },
  {
    path: 'input',
    loadComponent: () => import('./input/input').then((m) => m.InputComponent),
  },
  {
    path: 'viewchild',
    loadComponent: () => import('./viewchild/viewchild').then((m) => m.ViewChildComponent),

    children: VIEWCHILD_ROUTES,
  },
];
