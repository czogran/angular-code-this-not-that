import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-timers-section',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './timers.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Timer Memory Leaks (setInterval/setTimeout)</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Timers created with <code>setInterval()</code> and <code>setTimeout()</code> continue
          running after component destruction if not explicitly cleared.
        </p>

        <div class="example-section">
          <h3>❌ Memory Leak Example</h3>
          <button mat-raised-button (click)="leakyTimer()">Start Leaky Timer</button>
          <div class="log">{{ leakyValue() }}</div>
        </div>

        <div class="example-section">
          <h3>✓ Correct Example</h3>
          <button mat-raised-button color="primary" (click)="properTimer()">
            Start Timer (Cleaned)
          </button>
          <button mat-raised-button (click)="properCleanup()">Stop Timer</button>
          <div class="log">{{ properValue() }}</div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class TimersComponent implements OnDestroy {
  leakyValue = signal('0');
  properValue = signal('0');

  private properTimerId: number | null = null;

  leakyTimer() {
    let counter = 0;
    setInterval(() => {
      counter++;
      this.leakyValue.set(counter.toString());
      console.log('Leaky timer:', counter);
    }, 1000);
  }

  properTimer() {
    let counter = 0;
    this.properTimerId = window.setInterval(() => {
      counter++;
      this.properValue.set(counter.toString());
      console.log('Proper timer:', counter);
    }, 1000);
  }

  properCleanup() {
    if (this.properTimerId !== null) {
      clearInterval(this.properTimerId);
      this.properTimerId = null;
      this.properValue.set('stopped');
      console.log('Timer cleared');
    }
  }

  ngOnDestroy() {
    console.log('🗑️ TimersComponent destroyed');
    if (this.properTimerId !== null) {
      clearInterval(this.properTimerId);
    }
  }
}
