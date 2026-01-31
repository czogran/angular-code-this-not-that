import { ChangeDetectorRef, Component, inject, model, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CounterModel } from './default';

@Component({
  selector: 'app-default-child-two',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './default-child-two.scss',
  template: `
    <mat-card class="child-two">
      <mat-card-header>
        <mat-card-title>Child Component 2 (Default)</mat-card-title>
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
    </mat-card>{{testCanary()}}
  `,
})
export class DefaultChildTwoComponent {
  immutableCounter = model.required<CounterModel>();
  mutableCounter = model.required<CounterModel>();
  localCounter = signal<CounterModel>({ value: 0 });
  checkCount = signal(0);

  testCanary() {
    document.querySelector('.child-two')?.classList.add('flash');
    setTimeout(() => {
      document.querySelector('.child-two')?.classList.remove('flash');
    }, 400);
    return '';
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
