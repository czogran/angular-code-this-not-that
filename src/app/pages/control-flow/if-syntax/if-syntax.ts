import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IfPerformanceComparisonComponent } from './if-performance-comparison';

@Component({
  selector: 'app-if-syntax',
  imports: [
    MatCardModule,
    NgIf,
    MatInputModule,
    MatFormFieldModule,
    IfPerformanceComparisonComponent,
  ],
  styleUrl: './if-syntax.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>&#64;if vs *ngIf</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field>
          <mat-label>Age</mat-label>
          <input matInput type="number" [value]="user().age" (input)="updateAge($event)" />
        </mat-form-field>
        <div class="example-section">
          <h3>Multiple *ngIf (separate conditions)</h3>
          <div *ngIf="user().age < 18">
            <p>Teenager</p>
          </div>
          <div *ngIf="user().age >= 18 && user().age < 65">
            <p>Adult</p>
          </div>
          <div *ngIf="user().age >= 65">
            <p>Retired</p>
          </div>
        </div>

        <div class="example-section">
          <h3>*ngIf with else (template references)</h3>
          <div *ngIf="user().age < 18; else adultOrRetired">
            <p>Teenager</p>
          </div>
          <ng-template #adultOrRetired>
            <div *ngIf="user().age < 65; else retired">
              <p>Adult</p>
            </div>
            <ng-template #retired>
              <p>Retired</p>
            </ng-template>
          </ng-template>
        </div>

        <div class="example-section">
          <h3>&#64;if / &#64;else if / &#64;else (new syntax)</h3>
          @if (user().age < 18) {
            <p>Teenager</p>
          } @else if (user().age < 65) {
            <p>Adult</p>
          } @else {
            <p>Retired</p>
          }
        </div>

        <app-if-performance-comparison />
      </mat-card-content>
    </mat-card>
  `,
})
export class IfSyntaxComponent {
  user = signal({ age: 25 });

  updateAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const age = parseInt(input.value, 10);
    if (!isNaN(age)) {
      this.user.set({ age });
    }
  }
}
