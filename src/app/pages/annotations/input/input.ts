import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { InputChildComponent } from './input-child';

@Component({
  selector: 'app-input',
  imports: [MatCardModule, MatButtonModule, InputChildComponent],
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Input Decorator - Parent Component</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="controls">
          <div class="control-group">
            <p><strong>Immediate Input:</strong> {{ immediateValue() }}</p>
    
          </div>
          <div class="control-group">
            <p><strong>Delayed Input:</strong> {{ delayedValue() }}</p>
            <button mat-raised-button color="accent" (click)="incrementDelayed()">
              Increment Delayed (1s)
            </button>
          </div>
          <div class="control-group">
            <p><strong>Every Time Input:</strong> {{ everyTimeValue() }}</p>
            <button mat-raised-button (click)="incrementEveryTime()">Increment Every Time</button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>

    <app-input-child
      [immediateValue]="immediateValue()"
      [delayedValue]="delayedValue()"
      [everyTimeValue]="everyTimeValue()"
    />
  `,
})
export class InputComponent {
  immediateValue = signal(123);
  delayedValue = signal(0);
  everyTimeValue = signal(0);

  incrementImmediate() {
    this.immediateValue.update((v) => v + 1);
  }

  incrementDelayed() {
    setTimeout(() => {
      this.delayedValue.update((v) => v + 1);
    }, 1000);
  }

  incrementEveryTime() {
    this.everyTimeValue.update((v) => v + 1);
  }
}
