import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/welcome/welcome').then((m) => m.WelcomeComponent),
  },
  {
    path: 'rxjs',
    loadComponent: () => import('./pages/rxjs/rxjs').then((m) => m.RxjsComponent),
    loadChildren: () => import('./pages/rxjs/rxjs.routes').then((m) => m.RXJS_ROUTES),
  },
  {
    path: 'memory-leaks',
    loadComponent: () =>
      import('./pages/memory-leaks/memory-leaks').then((m) => m.MemoryLeaksComponent),
    loadChildren: () =>
      import('./pages/memory-leaks/memory-leaks-routing').then((m) => m.MEMORY_LEAKS_ROUTES),
  },
  {
    path: 'signals',
    loadComponent: () => import('./pages/signals/signals').then((m) => m.SignalsComponent),
    loadChildren: () => import('./pages/signals/signals-routing').then((m) => m.SIGNALS_ROUTES),
  },
  {
    path: 'annotations',
    loadComponent: () =>
      import('./pages/annotations/annotations').then((m) => m.AnnotationsComponent),
    loadChildren: () =>
      import('./pages/annotations/annotations-routing').then((m) => m.ANNOTATIONS_ROUTES),
  },
  {
    path: 'control-flow',
    loadComponent: () =>
      import('./pages/control-flow/control-flow').then((m) => m.ControlFlowComponent),
    loadChildren: () =>
      import('./pages/control-flow/control-flow-routing').then((m) => m.CONTROL_FLOW_ROUTES),
  },
  {
    path: 'change-detection',
    loadComponent: () =>
      import('./pages/change-detection/change-detection').then((m) => m.ChangeDetectionComponent),
    loadChildren: () =>
      import('./pages/change-detection/change-detection-routing').then(
        (m) => m.CHANGE_DETECTION_ROUTES,
      ),
  },
];
