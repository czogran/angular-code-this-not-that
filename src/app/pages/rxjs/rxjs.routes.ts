import { Routes } from '@angular/router';
import { SHARE_REPLAY_ROUTES } from './share-replay/share-replay-routing';

export const RXJS_ROUTES: Routes = [
  {
    path: 'cold-vs-hot',
    loadComponent: () => import('./cold-vs-hot/cold-vs-hot').then((m) => m.ColdVsHotComponent),
  },
  { path: 'share-replay', children: SHARE_REPLAY_ROUTES },
  {
    path: 'unsubscribe-patterns',
    loadComponent: () =>
      import('./unsubscribe-patterns/unsubscribe-patterns').then(
        (m) => m.UnsubscribePatternsComponent,
      ),
  },
  { path: '', redirectTo: 'unsubscribe-patterns', pathMatch: 'full' },
];
