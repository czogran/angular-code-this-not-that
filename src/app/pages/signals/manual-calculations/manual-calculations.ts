import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manual-calculations',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './manual-calculations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Manual Calculations vs Computed Signals</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Calculating derived values manually in templates causes unnecessary recalculations. Use
          computed() signals for automatic, optimized updates.
        </p>

        <div class="example-section">
          <h3>❌ Bad - Calculating in Template</h3>
          <button mat-raised-button (click)="incrementBad()">Increment Count</button>
          <div class="log">
            Count: {{ badCount() }}<br />
            Double: {{ badCount() * 2 }}<br />
            Triple: {{ getBadTriple() }}
          </div>
        </div>

        <div class="example-section">
          <h3>✓ Good - Using Computed Signals</h3>
          <button mat-raised-button color="primary" (click)="incrementGood()">
            Increment Count
          </button>
          <div class="log">
            Count: {{ goodCount() }}<br />
            Double : {{ goodDouble() }}<br />
            Triple: {{ goodTriple() }}
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class ManualCalculationsComponent {
  badCount = signal(0);

  goodCount = signal(0);

  goodDouble = computed(() => {
    return this.goodCount() * 2;
  });

  goodTriple = computed(() => {
    console.log('Computing goodTriple');
    return this.goodCount() * 3;
  });

  incrementBad() {
    this.badCount.update((c) => c + 1);
  }

  incrementGood() {
    this.goodCount.update((c) => c + 1);
  }

  getBadTriple() {
    console.log('Computing badTriple');
    return this.badCount() * 3;
  }
}
