import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionNavComponent, NavTab } from '../../shared/section-nav/section-nav';

@Component({
  selector: 'app-control-flow',
  imports: [SectionNavComponent],
  template: ` <app-section-nav [title]="'Control Flow Syntax'" [tabs]="tabs" /> `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlFlowComponent {
  tabs: NavTab[] = [
    { routerLink: 'if-syntax', label: '✓ if Syntax' },
    { routerLink: 'for-syntax', label: '🔁 for Syntax' },
    { routerLink: 'switch-syntax', label: '🔀 switch Syntax' },
  ];
}
