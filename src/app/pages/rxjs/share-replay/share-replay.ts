import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabNavComponent, TabNavItem } from '../../../shared/tab-nav/tab-nav';

@Component({
  selector: 'app-share-replay',
  imports: [TabNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <app-tab-nav [tabs]="tabs" /> `,
  styles: '',
})
export class ShareReplayComponent {
  tabs: TabNavItem[] = [
    { routerLink: 'cold-observable', label: 'Cold Observable' },
    { routerLink: 'hot-observable', label: 'Hot Observable' },
    { routerLink: 'memory-leaks', label: 'Memory Leaks' },
  ];
}
