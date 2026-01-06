import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabNavComponent, TabNavItem } from '../../../shared/tab-nav/tab-nav';

@Component({
  selector: 'app-default-vs-onpush',
  imports: [TabNavComponent],
  styleUrl: './default-vs-onpush.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <app-tab-nav [tabs]="tabs" /> `,
})
export class DefaultVsOnpushComponent {
  tabs: TabNavItem[] = [
    { routerLink: 'default', label: 'Default' },
    { routerLink: 'onpush', label: 'OnPush' },
  ];
}
