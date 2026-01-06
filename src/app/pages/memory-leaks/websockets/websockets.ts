import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WebSocketDemoService } from './websocket-demo.service';

@Component({
  selector: 'app-websockets-section',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './websockets.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>WebSocket Memory Leaks</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          WebSocket connections remain open and consume resources if not explicitly closed when the
          component is destroyed.
        </p>

        <div class="example-section">
          <h3>❌ Memory Leak Example</h3>
          <button mat-raised-button (click)="service.connectLeaky()">
            Open Connection (Leaky)
          </button>
          <div class="log">{{ service.leakyStatus() }}</div>
          <div class="messages">
            @for (msg of service.leakyMessages(); track $index) {
              <div>{{ msg }}</div>
            }
          </div>
        </div>

        <div class="example-section">
          <h3>✓ Correct Example</h3>
          <button mat-raised-button color="primary" (click)="service.connectProper()">
            Open Connection (Cleaned)
          </button>
          <button mat-raised-button (click)="service.closeProper()">Close Connection</button>
          <div class="log">{{ service.properStatus() }}</div>
          <div class="messages">
            @for (msg of service.properMessages(); track $index) {
              <div>{{ msg }}</div>
            }
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class WebSocketsComponent implements OnDestroy {
  service = inject(WebSocketDemoService);

  ngOnDestroy() {
    console.log('🗑️ WebSocketsComponent destroyed');
    this.service.cleanup();
  }
}
