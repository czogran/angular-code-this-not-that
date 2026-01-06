import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { of, share, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'app-share-replay-cold-observable',
  imports: [MatCardModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Cold observable (no sharing)</mat-card-title>
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
        <mat-card-title>With shareReplay()</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="value">{{ coldWithShareReplay$ | async }}</p>
        <p class="value">{{ coldWithShareReplay$ | async }}</p>
        <p class="value">{{ coldWithShareReplay$ | async }}</p>
        <p class="count">Execution count: {{ executionCountWithShareReplay }}</p>
      </mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-header>
        <mat-card-title>With share()</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p class="value">{{ coldWithShare$ | async }}</p>
        <p class="value">{{ coldWithShare$ | async }}</p>
        <p class="value">{{ coldWithShare$ | async }}</p>
        <p class="count">Execution count: {{ executionCountWithShare }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './cold-observable.scss',
})
export class ColdObservableComponent {
  source$ = of('Title 1', 'Title 2', 'Title 3');

  pureSourceCount = 0;
  pureSource$ = this.source$.pipe(tap(() => this.pureSourceCount++));

  executionCountWithShareReplay = 0;
  coldWithShareReplay$ = this.source$.pipe(
    tap(() => this.executionCountWithShareReplay++),
    shareReplay(1),
  );

  executionCountWithShare = 0;
  coldWithShare$ = this.source$.pipe(
    tap(() => this.executionCountWithShare++),
    share(),
  );
}
