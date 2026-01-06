import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionNavComponent, NavTab } from '../../../shared/section-nav/section-nav';
import { TabNavComponent } from '../../../shared/tab-nav/tab-nav';

@Component({
  selector: 'app-for-syntax',
  imports: [TabNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <app-tab-nav [tabs]="tabs" /> `,
})
export class ForSyntaxComponent {
  tabs: NavTab[] = [
    { routerLink: 'syntax', label: '📋*ngFor vs @for' },
    { routerLink: 'trackby', label: '🎯 TrackBy Patterns' },
  ];
}
