import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { interval, shareReplay, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-share-replay-memory-leaks',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Memory Leak Example - shareReplay with refCount</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Check console for subscription logs. This demonstrates shareReplay without refCount
          causing memory leaks.
        </p>

        <div class="example-section">
          <h3>With refCount: true</h3>
          <p>Source stops when no subscribers.</p>
          <div class="button-group">
            <button mat-raised-button color="primary" (click)="startRefCountTrue()">
              Subscribe
            </button>
            <button mat-raised-button color="warn" (click)="stopRefCountTrue()">Unsubscribe</button>
          </div>
        </div>

        <div class="example-section">
          <h3>With refCount: false (Leak)</h3>
          <p>Source KEEPS running even after unsubscribe!</p>
          <div class="button-group">
            <button mat-raised-button color="primary" (click)="startRefCountFalse()">
              Subscribe
            </button>
            <button mat-raised-button color="warn" (click)="stopRefCountFalse()">
              Unsubscribe
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './share-replay-memory-leaks.scss',
})
export class ShareReplayMemoryLeaksComponent implements OnDestroy {
  subTrue: Subscription | null = null;
  subFalse: Subscription | null = null;

  source$ = interval(1000).pipe(tap((v) => console.log('Source Emitting', v)));

  sourceWithRefCount$ = this.source$.pipe(shareReplay({ bufferSize: 1, refCount: true }));

  sourceWithoutRefCount$ = this.source$.pipe(shareReplay({ bufferSize: 1, refCount: false }));

  startRefCountTrue() {
    if (!this.subTrue) {
      console.log('Subscribing to RefCount: TRUE');
      this.subTrue = this.sourceWithRefCount$.subscribe((v) =>
        console.log('[RefCount: TRUE] Subscriber received', v),
      );
    }
  }

  stopRefCountTrue() {
    if (this.subTrue) {
      console.log('Unsubscribing from RefCount: TRUE');
      this.subTrue.unsubscribe();
      this.subTrue = null;
    }
  }

  startRefCountFalse() {
    if (!this.subFalse) {
      console.log('Subscribing to RefCount: FALSE');
      this.subFalse = this.sourceWithoutRefCount$.subscribe((v) =>
        console.log('[RefCount: FALSE] Subscriber received', v),
      );
    }
  }

  stopRefCountFalse() {
    if (this.subFalse) {
      console.log('Unsubscribing from RefCount: FALSE');
      this.subFalse.unsubscribe();
      this.subFalse = null;
      console.log('Check console: Source should still be emitting for RefCount: FALSE');
    }
  }

  ngOnDestroy() {
    this.subTrue?.unsubscribe();
    this.subFalse?.unsubscribe();
  }
}
