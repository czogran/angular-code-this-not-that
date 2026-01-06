import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-event-listeners-section',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './event-listeners.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Event Listener Memory Leaks</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Event listeners added with <code>addEventListener()</code> must be explicitly removed or
          they persist, causing memory leaks.
        </p>

        <div class="example-section">
          <h3>❌ Memory Leak Example</h3>
          <button mat-raised-button (click)="leakyListen()">Add Listener (Leaks)</button>
          <p class="log">{{ leakedListenerCount() }}</p>
        </div>

        <div class="example-section">
          <h3>✓ Correct Example</h3>
          <button mat-raised-button color="primary" (click)="properListen()">
            Add Listener (Cleaned)
          </button>
          <button mat-raised-button (click)="properCleanup()">Cleanup Listener</button>
          <p class="log">{{ properListenerCount() }}</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class EventListenersComponent implements OnDestroy {
  leakedListenerCount = signal(0);
  properListenerCount = signal(0);

  private leakyListeners: (() => void)[] = [];
  private properHandler = () => {
    console.log('Proper Listener Clicked!');
    this.properListenerCount.update((count) => count + 1);
  };

  leakyListen() {
    const handler = () => {
      console.log('Leaky Listener Clicked!');
      this.leakedListenerCount.update((count) => count + 1);
    };
    document.addEventListener('click', handler);
    this.leakyListeners.push(handler);
  }

  properListen() {
    document.addEventListener('click', this.properHandler);
  }

  properCleanup() {
    document.removeEventListener('click', this.properHandler);
  }

  ngOnDestroy() {
    console.log('🗑️ EventListenersComponent destroyed');
    document.removeEventListener('click', this.properHandler);
  }
}
