import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
  inject,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dangling-refs-section',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './dangling-refs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title
          >TODO something wrong with this Dangling Component References</mat-card-title
        >
      </mat-card-header>
      <mat-card-content>
        <p>
          Even when you destroy a component, keeping the reference prevents garbage collection.
          Always set references to null after destruction. Open DevTools profiler.
        </p>

        <div class="example-section">
          <h3>❌ Memory Leak Example</h3>
          <button mat-raised-button (click)="createWithoutCleanup()">
            Create Component (Ref Not Cleared)
          </button>
          <div class="log">Components created: {{ leakyCount() }}</div>
        </div>

        <div class="example-section">
          <h3>✓ Correct Example</h3>
          <button mat-raised-button color="primary" (click)="createWithCleanup()">
            Create Component (Ref Cleared)
          </button>
          <div class="log">Components created: {{ cleanCount() }}</div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class DanglingRefsComponent implements OnDestroy {
  vcr = inject(ViewContainerRef);

  leakyCount = signal(0);
  cleanCount = signal(0);

  private leakyRef: ComponentRef<DynamicChildComponent> | null = null;
  private cleanRef: ComponentRef<DynamicChildComponent> | null = null;

  createWithoutCleanup() {
    if (this.leakyRef) {
      this.leakyRef.destroy();
    }
    this.leakyRef = this.vcr.createComponent(DynamicChildComponent);
    this.leakyCount.update((c) => c + 1);
  }

  createWithCleanup() {
    if (this.cleanRef) {
      this.cleanRef.destroy();
      this.cleanRef = null;
    }
    this.cleanRef = this.vcr.createComponent(DynamicChildComponent);
    this.cleanCount.update((c) => c + 1);
  }

  ngOnDestroy() {
    console.log('🗑️ DanglingRefsComponent destroyed');

    if (this.leakyRef) {
      this.leakyRef.destroy();
    }

    if (this.cleanRef) {
      this.cleanRef.destroy();
      this.cleanRef = null;
    }
  }
}

@Component({
  selector: 'app-dynamic-child',
  template: '<div>Dynamic Component</div>',
})
class DynamicChildComponent implements OnInit, OnDestroy {
  private heavyPayload: string;

  constructor() {
    this.heavyPayload = new Array(200_000).fill('heavy-chunk').join('|');
  }

  ngOnInit() {
    console.log('DynamicChildComponent mounted, heavy payload bytes:', this.heavyPayload.length);
  }

  ngOnDestroy() {
    console.log('DynamicChildComponent destroyed, clearing heavy payload');
    this.heavyPayload = '';
  }
}
