import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { interval, share, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'app-share-replay-hot-observable',
  imports: [MatCardModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Hot observable (no sharing)</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="value">{{ pureSource$ | async }}</p>
        <p class="value">{{ pureSource$ | async }}</p>
        <p class="value">{{ pureSource$ | async }}</p>
        <p class="count">Execution count: {{ pureSourceCount }}</p>
      </mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-header>
        <mat-card-title>With share()</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="value">{{ hotWithShare$ | async }}</p>
        <p class="value">{{ hotWithShare$ | async }}</p>
        <p class="value">{{ hotWithShare$ | async }}</p>
        <p class="count">Execution count: {{ executionCountWithShare }}</p>
      </mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-header>
        <mat-card-title>With shareReplay()</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="value">{{ hotWithShareReplay$ | async }}</p>
        <p class="value">{{ hotWithShareReplay$ | async }}</p>
        <p class="value">{{ hotWithShareReplay$ | async }}</p>
        <p class="count">Execution count: {{ executionCountWithShareReplay }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './hot-observable.scss',
})
export class HotObservableComponent {
  source$ = interval(1000).pipe(takeUntilDestroyed());

  pureSourceCount = 0;
  pureSource$ = this.source$.pipe(tap(() => this.pureSourceCount++));

  executionCountWithShare = 0;
  hotWithShare$ = this.source$.pipe(
    tap(() => this.executionCountWithShare++),
    share(),
  );

  executionCountWithShareReplay = 0;
  hotWithShareReplay$ = this.source$.pipe(
    tap(() => this.executionCountWithShareReplay++),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}
