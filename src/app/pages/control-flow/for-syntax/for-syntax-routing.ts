import { Routes } from '@angular/router';

export const FOR_SYNTAX_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./for-syntax').then((m) => m.ForSyntaxComponent),
    children: [
      { path: '', redirectTo: 'syntax', pathMatch: 'full' },
      {
        path: 'syntax',
        loadComponent: () =>
          import('./ngfor-vs-for/ngfor-vs-for').then((m) => m.NgforVsForComponent),
      },
      {
        path: 'trackby',
        loadComponent: () =>
          import('./trackby-patterns/trackby-patterns').then((m) => m.TrackbyPatternsComponent),
      },
    ],
  },
];
