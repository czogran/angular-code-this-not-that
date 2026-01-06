import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topic-card',
  imports: [MatCardModule, MatButtonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './topic-card.scss',
  template: `
    <mat-card class="topic-card">
      <mat-card-content>
        <h3>{{ title() }}</h3>
        <p>{{ description() }}</p>
        <mat-card-actions>
          <button mat-raised-button color="primary" [routerLink]="routerLink()">
            {{ buttonText() }} →
          </button>
        </mat-card-actions>
      </mat-card-content>
    </mat-card>
  `,
})
export class TopicCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  routerLink = input.required<string>();
  buttonText = input.required<string>();
}
