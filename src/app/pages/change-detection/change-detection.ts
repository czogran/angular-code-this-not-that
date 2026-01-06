import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionNavComponent } from '../../shared/section-nav/section-nav';

@Component({
  selector: 'app-change-detection',
  imports: [SectionNavComponent],
  styleUrl: './change-detection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section-nav
      title="Change Detection"
      [tabs]="[
        { label: 'Default vs OnPush', routerLink: 'default-vs-onpush' },
        { label: 'Template Function Calls', routerLink: 'template-function-calls' },
      ]"
    />
  `,
})
export class ChangeDetectionComponent {}
