import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionNavComponent, NavTab } from '../../shared/section-nav/section-nav';

@Component({
  selector: 'app-memory-leaks',
  imports: [SectionNavComponent],
  template: ` <app-section-nav [title]="'Memory Leak'" [tabs]="tabs" /> `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryLeaksComponent {
  tabs: NavTab[] = [
    { routerLink: 'observables', label: '📡 Observables' },
    { routerLink: 'event-listeners', label: '🎯 Event Listeners' },
    { routerLink: 'timers', label: '⏱️ Timers' },
    { routerLink: 'websockets', label: '🔌 WebSockets' },
    { routerLink: 'component-refs', label: '🔗 Component Refs' },
    { routerLink: 'dangling-refs', label: '🔗 Dangling Refs' },
  ];
}
