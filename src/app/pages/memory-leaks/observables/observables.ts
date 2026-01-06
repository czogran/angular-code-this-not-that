import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-observables-section',
  imports: [RouterLink, MatCardModule, MatButtonModule],
  styleUrl: './observables.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Observable Subscription Memory Leaks</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Observable subscriptions remain active after component destruction, leading to memory
          leaks. Always unsubscribe using patterns like <code>async</code> pipe,
          <code>takeUntilDestroyed()</code>, or <code>takeUntil()</code>.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <a mat-button routerLink="/rxjs/unsubscribe-patterns" color="primary">
          View Unsubscribe Patterns Examples
        </a>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ObservablesComponent {}
