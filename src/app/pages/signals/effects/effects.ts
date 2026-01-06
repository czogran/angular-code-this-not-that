import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-effects-section',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './effects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Signal Effects - Common Issues</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Effects run side-effects when signals change, but misuse can cause infinite loops or
          memory leaks.
        </p>

        <div class="example-section">
          <h3>❌ Infinite Loop - Effect Modifying Its Own Dependencies</h3>
          <button mat-raised-button (click)="infiniteLoopExample()">
            Trigger Infinite Loop (reduced to 10 iterations)
          </button>
          <div class="log">Counter: {{ infiniteCounter() }}</div>
        </div>

        <div class="example-section">
          <h3>✓ Correct - Effect with allowSignalWrites</h3>
          <button mat-raised-button color="primary" (click)="correctEffectExample()">
            Trigger Correct Effect
          </button>
          <div class="log">Value: {{ correctValue() }}</div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class EffectsComponent {
  private injector = inject(Injector);

  infiniteCounter = signal(0);
  correctValue = signal(0);

  infiniteLoopExample() {
    runInInjectionContext(this.injector, () => {
      effect(
        () => {
          const current = this.infiniteCounter();
          console.log('❌ Infinite loop effect running:', current);
          if (current < 10) {
            this.infiniteCounter.set(current + 1);
          }
        },
        { allowSignalWrites: true },
      );
    });
  }

  correctEffectExample() {
    this.correctValue.update((v) => v + 1);
  }

  constructor() {
    effect(() => {
      console.log('✓ Proper effect - correctValue changed:', this.correctValue());
    });
  }
}
