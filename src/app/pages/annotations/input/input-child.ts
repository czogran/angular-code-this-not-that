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
        <div class="container">
          <div class="example-section">
            <div class="hooks-grid">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>ngOnInit</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p><strong>Immediate:</strong> {{ onInitImmediate }}</p>
                  <p><strong>Delayed:</strong> {{ onInitDelayed }}</p>
                  <p><strong>Every Time:</strong> {{ onInitEveryTime }}</p>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header>
                  <mat-card-title>ngOnChanges</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p><strong>Immediate:</strong> {{ onChangesImmediate() }}</p>
                  <p><strong>Delayed:</strong> {{ onChangesDelayed() }}</p>
                  <p><strong>Every Time:</strong> {{ onChangesEveryTime() }}</p>
                  <p class="note">Change count: {{ changeCount() }}</p>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header>
                  <mat-card-title>computed()</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p><strong>Immediate:</strong> {{ computedImmediate() }}</p>
                  <p><strong>Delayed:</strong> {{ computedDelayed() }}</p>
                  <p><strong>Every Time:</strong> {{ computedEveryTime() }}</p>
                </mat-card-content>
              </mat-card>

              <mat-card>
                <mat-card-header>
                  <mat-card-title>effect()</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p><strong>Immediate:</strong> {{ effectImmediate() }}</p>
                  <p><strong>Delayed:</strong> {{ effectDelayed() }}</p>
                  <p><strong>Every Time:</strong> {{ effectEveryTime() }}</p>
                  <p class="note">Effect run count: {{ effectRunCount() }}</p>
                </mat-card-content>
              </mat-card>
            </div>
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

  computedImmediate = computed(() => this.immediateValue());
  computedDelayed = computed(() => this.delayedValue());
  computedEveryTime = computed(() => this.everyTimeValue());

  effectImmediate = signal(0);
  effectDelayed = signal(0);
  effectEveryTime = signal(0);
  effectRunCount = signal(0);

  constructor() {
    effect(() => {
      this.effectImmediate.set(this.immediateValue());
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
