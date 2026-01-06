import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionNavComponent, NavTab } from '../../shared/section-nav/section-nav';

@Component({
  selector: 'app-signals',
  imports: [SectionNavComponent],
  template: ` <app-section-nav [title]="'Signals'" [tabs]="tabs" /> `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsComponent {
  tabs: NavTab[] = [
    { routerLink: 'effects', label: '⚡ Effects' },
    { routerLink: 'manual-calculations', label: '🧮 Manual Calculations' },
    { routerLink: 'reference-mutations', label: '🔄 Reference Mutations' },
  ];
}
