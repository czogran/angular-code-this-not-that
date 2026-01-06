import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-custom-equal',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './custom-equal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Custom Equal Function in Computed</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Use custom equal functions in computed signals to control when the computed value updates.
          The equal function compares previous and current values and determines if the computed
          value should be updated.
        </p>

        <div class="example-section">
          <h3>Custom Equal Function</h3>

          <div class="button-group">
            <button mat-raised-button (click)="mutateDirty()">❌ Mutate Directly</button>
            <button mat-raised-button color="primary" (click)="updateReferenceToDeepUser()">
              ✓ Update Reference
            </button>
            <button mat-raised-button color="primary" (click)="updateValueAndReference()">
              ✓ Update Value & Reference
            </button>
          </div>

          <div class="log">
            Name: {{ user().name }}<br />
            Age: {{ user().age }}<br />
            Summary (Custom Equal): {{ userAgeSummary() }}<br />
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class CustomEqualComponent {
  user = signal<User>({ name: 'Alice', age: 30 });

  userAgeSummary = computed(() => this.user().age, {
    equal: (prev, curr) => {
      return curr - prev < 2;
    },
  });

  mutateDirty() {
    this.user().age++;
  }

  updateValueAndReference() {
    this.user.update((user) => ({
      ...user,
      age: user.age + 1,
    }));
  }

  updateReferenceToDeepUser() {
    this.user.update((user) => ({ ...this.user() }));
  }
}
