import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

export interface TabNavItem {
  routerLink: string;
  label: string;
}

@Component({
  selector: 'app-tab-nav',
  imports: [MatTabsModule, RouterLink, RouterOutlet, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav mat-tab-nav-bar [tabPanel]="tabPanel">
      @for (tab of tabs(); track tab.routerLink) {
        <a
          mat-tab-link
          [routerLink]="tab.routerLink"
          routerLinkActive
          #rla="routerLinkActive"
          [active]="rla.isActive"
        >
          {{ tab.label }}
        </a>
      }
    </nav>
    <mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>
    <router-outlet />
  `,
  styleUrl: './tab-nav.scss',
})
export class TabNavComponent {
  tabs = input.required<TabNavItem[]>();
}
