import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TabNavComponent } from '../../../shared/tab-nav/tab-nav';

@Component({
  selector: 'app-viewchild',
  standalone: true,
  imports: [TabNavComponent],
  styleUrl: './viewchild.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-tab-nav
      [tabs]="[
        { routerLink: 'decorator', label: '@ViewChild' },
        { routerLink: 'signal', label: 'viewChild signal' },
      ]"
    />
  `,
})
export class ViewChildComponent {}
