import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-input-child',
  imports: [MatCardModule],
  styleUrl: './input-child.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Child Component - Input Handling Methods</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="methods-grid">
          <div class="method-section">
            <h3>ngOnInit</h3>
            <div class="values">
              <p><strong>Immediate:</strong> {{ onInitImmediate }}</p>
              <p><strong>Delayed:</strong> {{ onInitDelayed }}</p>
              <p><strong>Every Time:</strong> {{ onInitEveryTime }}</p>
            </div>
          </div>

          <div class="method-section">
            <h3>ngOnChanges</h3>
            <div class="values">
              <p><strong>Immediate:</strong> {{ onChangesImmediate() }}</p>
              <p><strong>Delayed:</strong> {{ onChangesDelayed() }}</p>
              <p><strong>Every Time:</strong> {{ onChangesEveryTime() }}</p>
            </div>
            <p class="note">Change count: {{ changeCount() }}</p>
          </div>

          <div class="method-section">
            <h3>computed()</h3>
            <div class="values">
              <p><strong>Immediate:</strong> {{ computedImmediate() }}</p>
              <p><strong>Delayed:</strong> {{ computedDelayed() }}</p>
              <p><strong>Every Time:</strong> {{ computedEveryTime() }}</p>
            </div>
          </div>

          <div class="method-section">
            <h3>effect()</h3>
            <div class="values">
              <p><strong>Immediate:</strong> {{ effectImmediate() }}</p>
              <p><strong>Delayed:</strong> {{ effectDelayed() }}</p>
              <p><strong>Every Time:</strong> {{ effectEveryTime() }}</p>
            </div>
            <p class="note">Effect run count: {{ effectRunCount() }}</p>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class InputChildComponent implements OnInit, OnChanges {
  immediateValue = input.required<number>();
  delayedValue = input.required<number>();
  everyTimeValue = input.required<number>();

  onInitImmediate = 0;
  onInitDelayed = 0;
  onInitEveryTime = 0;

  onChangesImmediate = signal(0);
  onChangesDelayed = signal(0);
  onChangesEveryTime = signal(0);
  changeCount = signal(0);

  computedImmediate = computed(() => this.immediateValue() );
  computedDelayed = computed(() => this.delayedValue() );
  computedEveryTime = computed(() => this.everyTimeValue() );

  effectImmediate = signal(0);
  effectDelayed = signal(0);
  effectEveryTime = signal(0);
  effectRunCount = signal(0);

constructor() {
    effect(() => {
      this.effectImmediate.set(this.immediateValue() );
      this.effectDelayed.set(this.delayedValue());
      this.effectEveryTime.set(this.everyTimeValue());
      this.effectRunCount.update((c) => c + 1);
    });
  }

  ngOnInit() {
    this.onInitImmediate = this.immediateValue();
    this.onInitDelayed = this.delayedValue();
    this.onInitEveryTime = this.everyTimeValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['immediateValue']) {
      this.onChangesImmediate.set(this.immediateValue());
    }
    if (changes['delayedValue']) {
      this.onChangesDelayed.set(this.delayedValue());
    }
    if (changes['everyTimeValue']) {
      this.onChangesEveryTime.set(this.everyTimeValue());
    }
    this.changeCount.update((c) => c + 1);
  }
}
