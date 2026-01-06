import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-price-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './price-cell.scss',
  template: `<span class="price" [class.value-updated]="isUpdated()">\${{ price() }}</span>`,
})
export class PriceCellComponent {
  price = input.required<number>();
  isUpdated = signal(false);
  private previousPrice: number | undefined;

  constructor() {
    effect(() => {
      const currentPrice = this.price();

      if (this.previousPrice !== undefined && this.previousPrice !== currentPrice) {
        this.isUpdated.set(true);
        setTimeout(() => {
          this.isUpdated.set(false);
        }, 1500);
      }

      this.previousPrice = currentPrice;
    });
  }
}
