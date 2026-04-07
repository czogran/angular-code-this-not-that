import { ChangeDetectionStrategy, Component, input, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-viewchild-signal-card',
  standalone: true,
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card [class]="cardClass()">
      <mat-card-header>
        <mat-card-title>{{ title() }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p><strong>Via getSecretValue():</strong> {{ methodValue() }}</p>
        <p><strong>Via secretElement():</strong> {{ elementValue() }}</p>
        <p><strong>Via secretElementDelayed():</strong> {{ elementDelayedValue() }}</p>
        <p><strong>localParagraph():</strong> {{ localValue() }}</p>
      </mat-card-content>
    </mat-card>
  `,
})
export class ViewChildSignalCardComponent {
  title = input.required<string>();
  cardClass = input<string>('');
  methodValue = input.required<string>();
  elementValue = input.required<string>();
  elementDelayedValue = input.required<string>();
  localValue = input.required<string>();
}
