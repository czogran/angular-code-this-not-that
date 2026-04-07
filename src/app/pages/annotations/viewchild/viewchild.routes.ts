import { Routes } from '@angular/router';

export const VIEWCHILD_ROUTES: Routes = [
  { path: '', redirectTo: 'decorator', pathMatch: 'full' },
  {
    path: 'decorator',
    loadComponent: () =>
      import('./viewchild-decorator/viewchild-decorator').then(
        (m) => m.ViewChildDecoratorComponent,
      ),
  },
  {
    path: 'signal',
    loadComponent: () =>
      import('./viewchild-signal/viewchild-signal').then((m) => m.ViewChildSignalComponent),
  },
];
