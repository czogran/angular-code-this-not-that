import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-object-mutations',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './object-mutations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Object Mutations - Signal Reactivity Issues</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Mutating objects without changing the reference won't trigger signal updates. Always
          create new references with set() or update().
        </p>

        <div class="example-section">
          <h3>Object Mutations</h3>

          <div class="button-group">
            <button mat-raised-button (click)="mutateDirectly()">❌ Mutate Directly</button>
            <button mat-raised-button (click)="updateIncorrectly()">❌ Update Incorrectly</button>
            <button mat-raised-button color="primary" (click)="updateReference()">
              ✓ Update Reference
            </button>
            <button mat-raised-button color="primary" (click)="updateCorrectly()">
              ✓ Update Correctly
            </button>
          </div>

          <div class="log-container">
            <div class="log">
              <strong>Bad (Direct Mutation)</strong><br />
              Name: {{ badUser().name }}<br />
              Age: {{ badUser().age }}<br />
              Age (Computed): {{ badUserAge() }}
            </div>
            <div class="log">
              <strong>Good (New Reference)</strong><br />
              Name: {{ goodUser().name }}<br />
              Age: {{ goodUser().age }}<br />
              Age (Computed): {{ goodUserAge() }}
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class ObjectMutationsComponent {
  initialUser = { name: 'John', age: 25 };

  badUser = signal<User>(this.initialUser);
  badUserAge = computed(() => this.badUser().age);

  goodUser = signal<User>(this.initialUser);
  goodUserAge = computed(() => this.goodUser().age);

  mutateDirectly() {
    this.badUser().age++;
  }

  updateIncorrectly() {
    this.badUser.update((user) => {
      user.age++;
      return user;
    });
  }

  updateReference() {
    this.goodUser.set({ ...this.goodUser() });
  }

  updateCorrectly() {
    this.goodUser.update((user) => ({
      ...user,
      age: user.age + 1,
    }));
  }
}
