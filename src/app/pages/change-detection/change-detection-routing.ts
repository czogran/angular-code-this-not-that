import { Routes } from '@angular/router';

export const CHANGE_DETECTION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'default-vs-onpush',
    pathMatch: 'full',
  },
  {
    path: 'default-vs-onpush',
    loadComponent: () =>
      import('./default-vs-onpush/default-vs-onpush.js').then((m) => m.DefaultVsOnpushComponent),
    loadChildren: () =>
      import('./default-vs-onpush/default-vs-onpush-routing.js').then(
        (m) => m.DEFAULT_VS_ONPUSH_ROUTES,
      ),
  },
  {
    path: 'template-function-calls',
    loadComponent: () =>
      import('./template-function-calls/template-function-calls.js').then(
        (m) => m.TemplateFunctionCallsComponent,
      ),
  },
];
