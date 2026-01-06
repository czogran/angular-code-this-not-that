import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface NavTab {
  routerLink: string;
  label: string;
}

@Component({
  selector: 'app-section-nav',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <header class="page-header">
        <button mat-icon-button routerLink="/" class="back-button">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>{{ title() }}</h1>
      </header>

      <nav class="section-nav">
        <div class="nav-tabs">
          @for (tab of tabs(); track tab.routerLink) {
            <button
              mat-button
              [routerLink]="tab.routerLink"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: false }"
            >
              {{ tab.label }}
            </button>
          }
        </div>
      </nav>

      <main class="content-area">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './section-nav.scss',
})
export class SectionNavComponent {
  title = input.required<string>();
  tabs = input.required<NavTab[]>();
}
