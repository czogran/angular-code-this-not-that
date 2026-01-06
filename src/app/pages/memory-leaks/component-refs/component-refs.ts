import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ComponentRefService } from './component-ref.service';

@Component({
  selector: 'app-component-refs-section',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './component-refs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Component References in Services</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Services that hold component references prevent garbage collection, causing memory leaks.
          Open DevTools console to see the logs.
        </p>

        <div class="example-section">
          <h3>❌ Memory Leak Example</h3>
          <button mat-raised-button (click)="leakyRef()">Store Ref (Leaky)</button>
          <div class="log">Leaky refs in service: {{ refService.getLeakyCount() }}</div>
        </div>

        <div class="example-section">
          <h3>✓ Correct Example</h3>
          <button mat-raised-button color="primary" (click)="properRef()">
            Store Ref (Cleaned)
          </button>
          <div class="log">Clean refs in service: {{ refService.getCleanCount() }}</div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class ComponentRefsComponent implements OnDestroy {
  name = `ComponentRefsComponent#${Math.floor(Math.random() * 10000)}`;
  refService = inject(ComponentRefService);

  leakyRef() {
    this.refService.storeLeaky(this);
  }

  properRef() {
    this.refService.storeClean(this);
  }

  ngOnDestroy() {
    console.log('🗑️ ComponentRefsComponent destroyed');
    this.refService.clearClean();
  }
}
