import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-array-mutations',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './array-mutations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Array Mutations - Signal Reactivity Issues</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Mutating arrays without changing the reference won't trigger signal updates. Always create
          new references with set() or update().
        </p>

        <div class="example-section">
          <h3>Array Mutations</h3>

          <div class="button-group">
            <button mat-raised-button (click)="pushDirectly()">❌ Push Directly</button>
            <button mat-raised-button color="primary" (click)="addCorrectly()">
              ✓ Add Correctly
            </button>
          </div>

          <div class="log-container">
            <div class="log">
              <strong>Bad (Direct Push)</strong><br />
              Items: {{ badArray().length }}<br />
              Length (Computed): {{ badArrayLength() }}<br />
              @for (item of badArray(); track $index) {
                <span>{{ item }}, </span>
              }
            </div>
            <div class="log">
              <strong>Good (New Reference)</strong><br />
              Items: {{ goodArray().length }}<br />
              Length (Computed): {{ goodArrayLength() }}<br />
              @for (item of goodArray(); track $index) {
                <span>{{ item }}, </span>
              }
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class ArrayMutationsComponent {
  initialArray = ['apple', 'banana'];
  badArray = signal<string[]>(this.initialArray);
  badArrayLength = computed(() => this.badArray().length);

  goodArray = signal<string[]>(this.initialArray);
  goodArrayLength = computed(() => this.goodArray().length);

  pushDirectly() {
    this.badArray().push('orange');
  }

  addCorrectly() {
    this.goodArray.update((arr) => [...arr, 'elephant']);
  }
}
