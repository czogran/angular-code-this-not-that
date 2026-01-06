import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CounterModel } from './onpush';

@Component({
  selector: 'app-onpush-child-one',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './onpush-child-one.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card [class.flash]="isChecking()">
      <mat-card-header>
        <mat-card-title>Child Component 1 (OnPush)</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="counters">
          <div class="counter-group">
            <p><strong>Global Immutable Counter:</strong> {{ immutableCounter().value }}</p>
            <button mat-raised-button color="primary" (click)="incrementGlobalImmutable()">
              Increment Global (Immutable)
            </button>
          </div>
          <div class="counter-group">
            <p><strong>Global Mutable Counter:</strong> {{ mutableCounter().value }}</p>
            <button mat-raised-button color="accent" (click)="incrementGlobalMutable()">
              Increment Global (Mutate)
            </button>
          </div>
          <div class="counter-group">
            <p><strong>Local Counter:</strong> {{ localCounter().value }}</p>
            <button mat-raised-button color="primary" (click)="incrementLocalImmutable()">
              Increment Local
            </button>
          </div>
        </div>
        <p class="note">Change Detection Runs: {{ checkCount() }}</p>
      </mat-card-content>
    </mat-card>
  `,
})
export class OnpushChildOneComponent {
  immutableCounter = model.required<CounterModel>();
  mutableCounter = model.required<CounterModel>();
  localCounter = signal<CounterModel>({ value: 0 });
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

  incrementGlobalImmutable() {
    this.immutableCounter.set({ value: this.immutableCounter().value + 1 });
  }

  incrementGlobalMutable() {
    this.mutableCounter().value++;
    this.mutableCounter.set(this.mutableCounter());
  }

  incrementLocalImmutable() {
    this.localCounter.set({ value: this.localCounter().value + 1 });
  }
}
