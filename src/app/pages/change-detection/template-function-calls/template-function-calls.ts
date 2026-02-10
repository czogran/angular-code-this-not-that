import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-template-function-calls',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './template-function-calls.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Template Function Calls</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          Calling functions in templates causes performance issues because they execute on every
          change detection cycle.
        </p>

        <div class="button-group">
          <button mat-raised-button color="primary" (click)="updatePrice()">Update Price</button>
          <button mat-raised-button (click)="triggerCD()">Trigger Change Detection</button>
          <button mat-raised-button (click)="dummyClick()">Dummy Click</button>
        </div>

        <div class="example-section">
          <h3>❌ Bad - Function Called in Template</h3>
          <div class="log">
            Base Price: {{ basePrice() }}<br />
            Final Price: {{ calculateFinalPrice() }}<br />
            Function Calls: {{ badCallCount }}
          </div>
        </div>

        <div class="example-section">
          <h3>✓ Good - Using Computed Signal</h3>
          <div class="log">
            Base Price: {{ basePrice() }}<br />
            Final Price: {{ computedFinalPrice() }}<br />
            Calculations: {{ goodCallCount }}
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class TemplateFunctionCallsComponent {
  private cdr = inject(ChangeDetectorRef);

  basePrice = signal(100);
  taxRate = 0.2;

  badCallCount = 0;
  calculateFinalPrice(): number {
    this.badCallCount++;
    return this.basePrice() * (1 + this.taxRate);
  }

  goodCallCount = 0;
  computedFinalPrice = computed(() => {
    this.goodCallCount++;
    return this.basePrice() * (1 + this.taxRate);
  });

  updatePrice() {
    this.basePrice.set(this.basePrice() + 10);
  }

  triggerCD() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 1000);
  }

  dummyClick() {}
}
