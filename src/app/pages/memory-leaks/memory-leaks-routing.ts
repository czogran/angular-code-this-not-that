import { Routes } from '@angular/router';

export const MEMORY_LEAKS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'observables',
  },
  {
    path: 'observables',
    loadComponent: () => import('./observables/observables').then((m) => m.ObservablesComponent),
  },
  {
    path: 'event-listeners',
    loadComponent: () =>
      import('./event-listeners/event-listeners').then((m) => m.EventListenersComponent),
  },
  {
    path: 'timers',
    loadComponent: () => import('./timers/timers').then((m) => m.TimersComponent),
  },
  {
    path: 'websockets',
    loadComponent: () => import('./websockets/websockets').then((m) => m.WebSocketsComponent),
  },
  {
    path: 'component-refs',
    loadComponent: () =>
      import('./component-refs/component-refs').then((m) => m.ComponentRefsComponent),
  },
  {
    path: 'dangling-refs',
    loadComponent: () =>
      import('./dangling-refs/dangling-refs').then((m) => m.DanglingRefsComponent),
  },
];
