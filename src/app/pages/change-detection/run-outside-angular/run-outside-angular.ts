import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnDestroy,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-run-outside-angular',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './run-outside-angular.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="page">
      <div class="examples">
        <!-- Inside Zone -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>❌ Inside Zone (default)</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="counter">Tick count: {{ insideCount() }}</div>
            <div class="cd-count">CD runs: {{ insideCdRuns }}</div>
          </mat-card-content>
          <mat-card-actions>
            <button
              mat-raised-button
              color="primary"
              (click)="startInside()"
              [disabled]="insideRunning"
            >
              Start
            </button>
            <button mat-raised-button (click)="stopInside()" [disabled]="!insideRunning">
              Stop
            </button>
          </mat-card-actions>
        </mat-card>

        <!-- Outside Zone -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>✓ Outside Zone</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="counter">Tick count: {{ outsideCount() }}</div>
            <div class="cd-count">CD runs: {{ outsideCdRuns }}</div>
          </mat-card-content>
          <mat-card-actions>
            <button
              mat-raised-button
              color="primary"
              (click)="startOutside()"
              [disabled]="outsideRunning"
            >
              Start
            </button>
            <button mat-raised-button (click)="stopOutside()" [disabled]="!outsideRunning">
              Stop
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
    {{ testCanary() }}
  `,
})
export class RunOutsideAngularComponent implements OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

  insideCount = signal(0);
  insideCdRuns = 0;
  insideRunning = false;
  private insideIntervalId: ReturnType<typeof setInterval> | null = null;

  outsideCount = signal(0);
  outsideCdRuns = 0;
  outsideRunning = false;
  private outsideIntervalId: ReturnType<typeof setInterval> | null = null;

  startInside() {
    this.insideRunning = true;
    this.insideIntervalId = setInterval(() => {
      // this.insideCount.update((c) => c + 1);
      // this.insideCdRuns++;
    }, 500);
  }

  stopInside() {
    this.insideRunning = false;
    if (this.insideIntervalId !== null) {
      clearInterval(this.insideIntervalId);
      this.insideIntervalId = null;
    }
  }

  startOutside() {
    this.outsideRunning = true;
    this.ngZone.runOutsideAngular(() => {
      this.outsideIntervalId = setInterval(() => {
        // const next = this.outsideCount() + 1;
        // this.outsideCount.set(next);
        // Re-enter zone every 5 ticks to batch UI updates
        // if (next % 5 === 0) {
        //   this.outsideCdRuns++;
        //   this.cdr.markForCheck();
        // }
      }, 500);
    });
  }

  stopOutside() {
    this.outsideRunning = false;
    if (this.outsideIntervalId !== null) {
      clearInterval(this.outsideIntervalId);
      this.outsideIntervalId = null;
    }
  }

  testCanary() {
    console.log('Canary triggered');
    return '';
  }

  ngOnDestroy() {
    this.stopInside();
    this.stopOutside();
  }
}
