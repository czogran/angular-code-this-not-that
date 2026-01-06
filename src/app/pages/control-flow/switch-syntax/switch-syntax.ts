import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { SwitchPerformanceComparisonComponent } from './switch-performance-comparison';

type Status = 'pending' | 'approved' | 'rejected';

@Component({
  selector: 'app-switch-syntax',
  imports: [
    MatCardModule,
    MatButtonModule,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    SwitchPerformanceComparisonComponent,
  ],
  styleUrl: './switch-syntax.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>&#64;switch vs *ngSwitch</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="button-group">
          <button mat-raised-button color="primary" (click)="setStatus('pending')">Pending</button>
          <button mat-raised-button color="accent" (click)="setStatus('approved')">Approved</button>
          <button mat-raised-button color="warn" (click)="setStatus('rejected')">Rejected</button>
        </div>

        <div class="example-section">
          <h3>*ngSwitch (old syntax)</h3>
          <div [ngSwitch]="status()">
            <div *ngSwitchCase="'pending'" class="status-card pending">
              <h4>⏳ Pending</h4>
              <p>Your request is being reviewed</p>
            </div>
            <div *ngSwitchCase="'approved'" class="status-card approved">
              <h4>✓ Approved</h4>
              <p>Your request has been approved</p>
            </div>
            <div *ngSwitchCase="'rejected'" class="status-card rejected">
              <h4>✗ Rejected</h4>
              <p>Your request has been rejected</p>
            </div>
            <div *ngSwitchDefault class="status-card default">
              <h4>Unknown Status</h4>
              <p>Status not recognized</p>
            </div>
          </div>
        </div>

        <div class="example-section">
          <h3>&#64;switch / &#64;case / &#64;default (new syntax)</h3>
          @switch (status()) {
            @case ('pending') {
              <div class="status-card pending">
                <h4>⏳ Pending</h4>
                <p>Your request is being reviewed</p>
              </div>
            }
            @case ('approved') {
              <div class="status-card approved">
                <h4>✓ Approved</h4>
                <p>Your request has been approved</p>
              </div>
            }
            @case ('rejected') {
              <div class="status-card rejected">
                <h4>✗ Rejected</h4>
                <p>Your request has been rejected</p>
              </div>
            }
            @default {
              <div class="status-card default">
                <h4>Unknown Status</h4>
                <p>Status not recognized</p>
              </div>
            }
          }
        </div>

        <app-switch-performance-comparison />
      </mat-card-content>
    </mat-card>
  `,
})
export class SwitchSyntaxComponent {
  status = signal<Status>('pending');

  setStatus(status: Status) {
    this.status.set(status);
  }
}
