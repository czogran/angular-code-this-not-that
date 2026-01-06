import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabNavComponent, TabNavItem } from '../../../shared/tab-nav/tab-nav';

@Component({
  selector: 'app-reference-mutations',
  imports: [TabNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <app-tab-nav [tabs]="tabs" /> `,
  styles: '',
})
export class ReferenceMutationsComponent {
  tabs: TabNavItem[] = [
    { routerLink: 'object-mutations', label: 'Object Mutations' },
    { routerLink: 'array-mutations', label: 'Array Mutations' },
    { routerLink: 'custom-equal', label: 'Custom Equal' },
  ];
}
