import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionNavComponent, NavTab } from '../../shared/section-nav/section-nav';

@Component({
  selector: 'app-rxjs',
  imports: [SectionNavComponent],
  template: ` <app-section-nav [title]="'RxJS Issues & Solutions'" [tabs]="tabs" /> `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsComponent {
  tabs: NavTab[] = [
    { routerLink: 'unsubscribe-patterns', label: '✅ Unsubscribe Patterns' },
    { routerLink: 'cold-vs-hot', label: '🔥❄️ Cold vs Hot Observable' },
    { routerLink: 'share-replay', label: '🔄 Share & ShareReplay' },
  ];
}
