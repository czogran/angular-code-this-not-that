import { Routes } from '@angular/router';
import { ControlFlowComponent } from './control-flow';

export const CONTROL_FLOW_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'if-syntax', pathMatch: 'full' },
      {
        path: 'if-syntax',
        loadComponent: () => import('./if-syntax/if-syntax').then((m) => m.IfSyntaxComponent),
      },
      {
        path: 'for-syntax',
        loadChildren: () =>
          import('./for-syntax/for-syntax-routing').then((m) => m.FOR_SYNTAX_ROUTES),
      },
      {
        path: 'switch-syntax',
        loadComponent: () =>
          import('./switch-syntax/switch-syntax').then((m) => m.SwitchSyntaxComponent),
      },
    ],
  },
];
