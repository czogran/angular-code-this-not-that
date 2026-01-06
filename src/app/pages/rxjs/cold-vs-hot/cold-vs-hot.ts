import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defer, of, Subject } from 'rxjs';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cold-vs-hot',
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButtonModule,
    MatTableModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cards-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Cold Observable</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="button-container">
            <button mat-raised-button (click)="addColdSubscriber()">Add Subscriber</button>
          </div>
          <table mat-table [dataSource]="coldSubscribers()" class="cold-table mat-elevation-z0">
            <ng-container matColumnDef="subscriber">
              <th mat-header-cell *matHeaderCellDef>Subscriber</th>
              <td mat-cell *matCellDef="let _; let i = index">Subscriber {{ i + 1 }}</td>
            </ng-container>

            <ng-container matColumnDef="of">
              <th mat-header-cell *matHeaderCellDef>of</th>
              <td mat-cell *matCellDef="let _">
                <strong>{{ (coldOf$ | async) ?? 'waiting...' }}</strong>
              </td>
            </ng-container>

            <ng-container matColumnDef="defer">
              <th mat-header-cell *matHeaderCellDef>defer</th>
              <td mat-cell *matCellDef="let _">
                <strong>{{ (coldDefer$ | async) ?? 'waiting...' }}</strong>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Hot Observable</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="button-container">
            <button mat-raised-button color="primary" (click)="emitHotValue()">
              Emit Shared Value
            </button>
            <button mat-raised-button (click)="addHotSubscriber()">Add Subscriber</button>
          </div>
          @for (subscriber of hotSubscribers(); track $index) {
            <p>
              Subscriber {{ $index + 1 }} received:
              <strong>{{ (hotObservable$ | async) ?? 'waiting...' }}</strong>
            </p>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./cold-vs-hot.scss'],
})
export class ColdVsHotComponent {
  // --- COLD ---
  // of() - Evaluates immediately once, all subscribers receive the same value
  // defer() - Creates a new observable for each subscription, each subscriber gets a new value
  coldOf$ = of(Math.random());
  coldDefer$ = defer(() => of(Math.random()));
  coldSubscribers = signal<number[]>([1, 2]);
  displayedColumns = ['subscriber', 'of', 'defer'];

  addColdSubscriber() {
    this.coldSubscribers.update((subscribers) => [...subscribers, 1]);
  }

  hotSource$ = new Subject<number>();
  hotObservable$ = this.hotSource$.asObservable();
  hotSubscribers = signal<number[]>([1, 2]);

  emitHotValue() {
    this.hotSource$.next(Math.random());
  }

  addHotSubscriber() {
    this.hotSubscribers.update((subscribers) => [...subscribers, 1]);
  }
}
