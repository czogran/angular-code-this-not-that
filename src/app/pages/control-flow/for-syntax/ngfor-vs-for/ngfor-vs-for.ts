import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { ForPerformanceComparisonComponent } from '../for-performance-comparison';

interface User {
  id: number;
  name: string;
  isActive: boolean;
}

@Component({
  selector: 'app-ngfor-vs-for',
  imports: [MatCardModule, MatButtonModule, NgFor, ForPerformanceComparisonComponent],
  styleUrl: './ngfor-vs-for.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>&#64;for vs *ngFor</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="button-group">
          <button mat-raised-button color="primary" (click)="addUser()">Add User</button>
          <button mat-raised-button color="warn" (click)="removeUser()">Remove User</button>
        </div>

        <div class="example-section">
          <h3>*ngFor (old syntax)</h3>
          <div *ngFor="let user of users(); let i = index; trackBy: trackById" class="user-item">
            <span class="index">{{ i + 1 }}</span>
            <span class="name">{{ user.name }}</span>
            <span class="status" [class.active]="user.isActive">
              {{ user.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>

        <div class="example-section">
          <h3>&#64;for with &#64;empty (new syntax)</h3>
          @for (user of users(); track user.id; let i = $index) {
            <div class="user-item">
              <span class="index">{{ i + 1 }}</span>
              <span class="name">{{ user.name }}</span>
              <span class="status" [class.active]="user.isActive">
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
          } @empty {
            <p class="empty-message">No users available</p>
          }
        </div>

        <app-for-performance-comparison />
      </mat-card-content>
    </mat-card>
  `,
})
export class NgforVsForComponent {
  users = signal<User[]>([
    { id: 1, name: 'Alice', isActive: true },
    { id: 2, name: 'Bob', isActive: false },
    { id: 3, name: 'Charlie', isActive: true },
  ]);

  addUser() {
    const newUser: User = {
      id: this.users().length + 1,
      name: `User ${this.users().length + 1}`,
      isActive: Math.random() > 0.5,
    };
    this.users.update((users) => [...users, newUser]);
  }

  removeUser() {
    this.users.update((users) => users.slice(0, -1));
  }

  trackById(index: number, user: User): number {
    return user.id;
  }
}
