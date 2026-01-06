import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Signal,
  Injector,
  runInInjectionContext,
  signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, Subject, Subscription, interval, takeUntil, takeWhile, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-unsubscribe-patterns',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title
          matTooltip="If you forget to call unsubscribe(), the subscription stays active, consuming memory and resources.&#10;Calling subscribe multiple times creates orphaned subscriptions that you cannot clean up."
          >1. Manual Unsubscribe - ⚠️ Memory Leak Risk</mat-panel-title
        >
      </mat-expansion-panel-header>
      <div class="button-group">
        <button mat-raised-button (click)="subscribeManualUnsubscribe()">Subscribe</button>
        <button mat-raised-button color="warn" (click)="unsubscribeManualSubscription()">
          Unsubscribe
        </button>
      </div>
      <p>Current: {{ manualUnsubscribeCurrentValue() ?? '—' }}</p>
    </mat-expansion-panel>

    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title
          matTooltip="If the stop condition is never met, the subscription continues indefinitely."
          >2. takeUntil with Subject ⚠️ Memory Leak Risk</mat-panel-title
        >
      </mat-expansion-panel-header>
      <div class="button-group">
        <button mat-raised-button (click)="subscribeTakeUntilPattern()">Subscribe</button>
        <button mat-raised-button color="warn" (click)="unsubscribeTakeUntilPattern()">
          Unsubscribe
        </button>
      </div>
      <p>Current: {{ takeUntilCurrentValue() ?? '—' }}</p>
    </mat-expansion-panel>

    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title
          matTooltip="If the stop condition is never met, the subscription continues indefinitely"
          >3. takeWhile with condition - ⚠️ Memory Leak Risk</mat-panel-title
        >
      </mat-expansion-panel-header>
      <div class="button-group">
        <button mat-raised-button (click)="subscribeTakeWhilePattern()">Subscribe</button>
        <button mat-raised-button color="warn" (click)="stopTakeWhilePattern()">Stop</button>
      </div>
      <p>Current: {{ takeWhileCurrentValue() ?? '—' }}</p>
    </mat-expansion-panel>

    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title>4. AsyncPipe with Observable</mat-panel-title>
      </mat-expansion-panel-header>
      <div class="button-group">
        <button mat-raised-button (click)="subscribeAsyncPipePattern()">Subscribe</button>
      </div>
      <p>Current: {{ asyncPipeObservable | async }}</p>
    </mat-expansion-panel>

    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title>5. takeUntil with component destroy$</mat-panel-title>
      </mat-expansion-panel-header>
      <div class="button-group">
        <button mat-raised-button (click)="subscribeWithDestroyNotifier()">Subscribe</button>
      </div>
      <p>Current: {{ destroyCurrentValue() ?? '—' }}</p>
    </mat-expansion-panel>

    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title>6. takeUntilDestroyed</mat-panel-title>
      </mat-expansion-panel-header>
      <div class="button-group">
        <button mat-raised-button (click)="subscribeTakeUntilDestroyedPattern()">Subscribe</button>
      </div>
      <p>Current: {{ takeUntilDestroyedCurrentValue() ?? '—' }}</p>
    </mat-expansion-panel>

    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title>7. toSignal (auto cleanup)</mat-panel-title>
      </mat-expansion-panel-header>
      <div class="button-group">
        <button mat-raised-button (click)="subscribeToSignalPattern()">Subscribe</button>
      </div>
      <p>Current: {{ toSignalValue ? (toSignalValue() ?? '—') : '—' }}</p>
    </mat-expansion-panel>

    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title
          matTooltip="manualCleanup disables Angular auto-teardown. If you skip Cleanup, the interval keeps running and can leak memory."
          >8. toSignal manualCleanup - ⚠️ Memory Leak Risk</mat-panel-title
        >
      </mat-expansion-panel-header>
      <div class="button-group">
        <button mat-raised-button (click)="subscribeToSignalManualCleanupPattern()">
          Subscribe
        </button>
        <button mat-raised-button color="warn" (click)="cleanupToSignalManual()">Cleanup</button>
      </div>
      <p>Current: {{ toSignalManualValue ? (toSignalManualValue() ?? '—') : '—' }}</p>
    </mat-expansion-panel>

    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title
          matTooltip="
             Calling subscribe multiple times creates orphaned subscriptions."
          >9. Manual cleanup in ngOnDestroy - ⚠️ Memory Leak Risk</mat-panel-title
        >
      </mat-expansion-panel-header>
      <div class="button-group">
        <button mat-raised-button (click)="subscribeManualCleanupOnDestroyPattern()">
          Subscribe
        </button>
      </div>
      <p>Current: {{ manualCleanupOnDestroyCurrentValue() ?? '—' }}</p>
    </mat-expansion-panel>
  `,
  styleUrl: './unsubscribe-patterns.scss',
})
export class UnsubscribePatternsComponent implements OnDestroy {
  private destroyNotifier = new Subject<void>();
  private takeUntilNotifier = new Subject<void>();
  private takeWhileCondition = true;

  private manualUnsubscribeSubscription: Subscription | null = null;
  private manualCleanupOnDestroySubscription: Subscription | null = null;

  manualUnsubscribeCurrentValue: WritableSignal<number | null> = signal(null);
  takeUntilCurrentValue: WritableSignal<number | null> = signal(null);
  takeWhileCurrentValue: WritableSignal<number | null> = signal(null);
  destroyCurrentValue: WritableSignal<number | null> = signal(null);
  takeUntilDestroyedCurrentValue: WritableSignal<number | null> = signal(null);
  toSignalValue: Signal<number | null> | null = null;
  toSignalManualValue: Signal<number | null> | null = null;
  manualCleanupOnDestroyCurrentValue: WritableSignal<number | null> = signal(null);
  asyncPipeObservable: Observable<number> | null = null;

  private toSignalManualStop$ = new Subject<void>();

  // Pattern 1: Manual unsubscribe
  subscribeManualUnsubscribe() {
    this.manualUnsubscribeCurrentValue.set(null);
    this.manualUnsubscribeSubscription = interval(1000)
      .pipe(tap((v) => console.log('Pattern 1 - Manual Unsubscribe:', v)))
      .subscribe((v) => {
        this.manualUnsubscribeCurrentValue.set(v);
      });
  }

  unsubscribeManualSubscription() {
    this.manualUnsubscribeSubscription?.unsubscribe();
  }

  // Pattern 2: takeUntil with Subject
  subscribeTakeUntilPattern() {
    this.takeUntilCurrentValue.set(null);
    interval(1000)
      .pipe(
        tap((v) => console.log('Pattern 2 - takeUntil:', v)),
        takeUntil(this.takeUntilNotifier),
      )
      .subscribe((v) => {
        this.takeUntilCurrentValue.set(v);
      });
  }

  unsubscribeTakeUntilPattern() {
    this.takeUntilNotifier.next();
  }

  // Pattern 3: takeWhile with condition
  subscribeTakeWhilePattern() {
    this.takeWhileCondition = true;
    this.takeWhileCurrentValue.set(null);
    interval(1000)
      .pipe(
        tap((v) => console.log('Pattern 3 - takeWhile:', v)),
        takeWhile(() => this.takeWhileCondition),
      )
      .subscribe((v) => {
        this.takeWhileCurrentValue.set(v);
      });
  }

  stopTakeWhilePattern() {
    this.takeWhileCondition = false;
  }

  // Pattern 4: AsyncPipe (auto cleanup)
  subscribeAsyncPipePattern() {
    this.asyncPipeObservable = interval(1000).pipe(
      tap((v) => console.log('Pattern 4 - AsyncPipe:', v)),
    );
  }

  // Pattern 5: Component destroy$ cleanup
  subscribeWithDestroyNotifier() {
    this.destroyCurrentValue.set(null);
    interval(1000)
      .pipe(
        tap((v) => console.log('Pattern 5 - Component destroy$:', v)),
        takeUntil(this.destroyNotifier),
      )
      .subscribe((v) => {
        this.destroyCurrentValue.set(v);
      });
  }

  // Pattern 6: takeUntilDestroyed (auto cleanup)
  subscribeTakeUntilDestroyedPattern() {
    this.takeUntilDestroyedCurrentValue.set(null);
    interval(1000)
      .pipe(
        tap((v) => console.log('Pattern 6 - takeUntilDestroyed:', v)),
        takeUntilDestroyed(),
      )
      .subscribe((v) => {
        this.takeUntilDestroyedCurrentValue.set(v);
      });
  }

  // Pattern 7: toSignal (auto cleanup)
  subscribeToSignalPattern() {
    this.toSignalValue = runInInjectionContext(inject(Injector), () =>
      toSignal(interval(1000).pipe(tap((v) => console.log('Pattern 7 - toSignal:', v))), {
        initialValue: null,
      }),
    );
  }

  // Pattern 8: toSignal with manualCleanup (requires manual teardown)
  subscribeToSignalManualCleanupPattern() {
    // stop any prior manual toSignal stream
    this.cleanupToSignalManual();

    this.toSignalManualValue = runInInjectionContext(inject(Injector), () =>
      toSignal(
        interval(1000).pipe(
          tap((v) => console.log('Pattern 8 - toSignal manualCleanup:', v)),
          takeUntil(this.toSignalManualStop$),
        ),
        {
          initialValue: null,
          manualCleanup: true,
        },
      ),
    );
  }

  cleanupToSignalManual() {
    this.toSignalManualStop$.next();
    this.toSignalManualStop$.complete();
    this.toSignalManualStop$ = new Subject<void>();
  }

  // Pattern 9: Manual cleanup in ngOnDestroy
  subscribeManualCleanupOnDestroyPattern() {
    this.manualCleanupOnDestroyCurrentValue.set(null);
    this.manualCleanupOnDestroySubscription = interval(1000)
      .pipe(tap((v) => console.log('Pattern 9 - Manual cleanup in ngOnDestroy:', v)))
      .subscribe((v) => {
        this.manualCleanupOnDestroyCurrentValue.set(v);
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier.next();
    this.destroyNotifier.complete();

    this.manualCleanupOnDestroySubscription?.unsubscribe();
  }
}
