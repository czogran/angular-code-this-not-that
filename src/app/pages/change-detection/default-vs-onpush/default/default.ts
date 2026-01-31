import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DefaultChildOneComponent } from './default-child-one';
import { DefaultChildTwoComponent } from './default-child-two';

export interface CounterModel {
  value: number;
}

@Component({
  selector: 'app-default',
  imports: [MatCardModule, MatButtonModule, DefaultChildOneComponent, DefaultChildTwoComponent],
  styleUrl: './default.scss',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Parent Component (Default)</mat-card-title>
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
        <p class="note">Change Detection Runs: {{ checkCount() }}</p>{{ testCanary() }}
      </mat-card-content>
    </mat-card>

    <div class="children">
      <app-default-child-one
        [(immutableCounter)]="immutableCounter"
        [(mutableCounter)]="mutableCounter"
      />
      <app-default-child-two
        [(immutableCounter)]="immutableCounter"
        [(mutableCounter)]="mutableCounter"
      />
    </div>
  `,
})
export class DefaultComponent {
  immutableCounter = signal<CounterModel>({ value: 0 });
  mutableCounter = signal<CounterModel>({ value: 0 });
  checkCount = signal(0);

  testCanary() {
    document.querySelector('mat-card')?.classList.add('flash');
    setTimeout(() => {
      document.querySelector('mat-card')?.classList.remove('flash');
    }, 400);
    return '';
  }
  incrementImmutable() {
    this.immutableCounter.set({ value: this.immutableCounter().value + 1 });
  }

  incrementMutable() {
    this.mutableCounter().value++;
    this.mutableCounter.set(this.mutableCounter());
  }
}
