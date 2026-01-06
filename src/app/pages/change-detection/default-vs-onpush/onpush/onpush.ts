import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OnpushChildOneComponent } from './onpush-child-one';
import { OnpushChildTwoComponent } from './onpush-child-two';

export interface CounterModel {
  value: number;
}

@Component({
  selector: 'app-onpush',
  imports: [MatCardModule, MatButtonModule, OnpushChildOneComponent, OnpushChildTwoComponent],
  styleUrl: './onpush.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card [class.flash]="isChecking()">
      <mat-card-header>
        <mat-card-title>Parent Component (OnPush)</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="counters">
          <div class="counter-group">
            <p><strong>Immutable Counter:</strong> {{ immutableCounter().value }}</p>
            <button mat-raised-button color="primary" (click)="incrementImmutable()">
              Increment Immutable (New Object)
            </button>
          </div>
          <div class="counter-group">
            <p><strong>Mutable Counter:</strong> {{ mutableCounter().value }}</p>
            <button mat-raised-button color="accent" (click)="incrementMutable()">
              Increment Mutable (Mutate)
            </button>
          </div>
        </div>
        <p class="note">Change Detection Runs: {{ checkCount() }}</p>
      </mat-card-content>
    </mat-card>

    <div class="children">
      <app-onpush-child-one
        [(immutableCounter)]="immutableCounter"
        [(mutableCounter)]="mutableCounter"
      />
      <app-onpush-child-two
        [(immutableCounter)]="immutableCounter"
        [(mutableCounter)]="mutableCounter"
      />
    </div>
  `,
})
export class OnpushComponent {
  immutableCounter = signal<CounterModel>({ value: 0 });
  mutableCounter = signal<CounterModel>({ value: 0 });
  checkCount = signal(0);
  isChecking = signal(false);
  cdr = inject(ChangeDetectorRef);

  ngDoCheck() {
    try {
      this.cdr.checkNoChanges();
    } catch (e) {
      this.checkCount.update((c) => c + 1);
      this.isChecking.set(true);
      setTimeout(() => this.isChecking.set(false), 300);
    }
  }

  incrementImmutable() {
    this.immutableCounter.set({ value: this.immutableCounter().value + 1 });
  }

  incrementMutable() {
    this.mutableCounter().value++;
    this.mutableCounter.set(this.mutableCounter());
  }
}
