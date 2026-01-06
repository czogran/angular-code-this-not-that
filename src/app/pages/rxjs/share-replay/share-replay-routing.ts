import { Routes } from '@angular/router';

export const SHARE_REPLAY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./share-replay').then((m) => m.ShareReplayComponent),
    children: [
      { path: '', redirectTo: 'cold-observable', pathMatch: 'full' },
      {
        path: 'cold-observable',
        loadComponent: () =>
          import('./cold-observable/cold-observable').then((m) => m.ColdObservableComponent),
      },
      {
        path: 'hot-observable',
        loadComponent: () =>
          import('./hot-observable/hot-observable').then((m) => m.HotObservableComponent),
      },
      {
        path: 'memory-leaks',
        loadComponent: () =>
          import('./memory-leaks/share-replay-memory-leaks').then(
            (m) => m.ShareReplayMemoryLeaksComponent,
          ),
      },
    ],
  },
];
