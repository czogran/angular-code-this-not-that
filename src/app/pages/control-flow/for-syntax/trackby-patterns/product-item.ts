import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PriceCellComponent } from './price-cell';

export interface ProductItemData {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-item',
  imports: [MatButtonModule, MatIconModule, PriceCellComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="product-item">
      <span class="id">ID: {{ product().id }}</span>
      <span class="name">{{ product().name }}</span>
      <app-price-cell [price]="product().price" />
      <button
        mat-icon-button
        color="warn"
        [attr.aria-label]="'Delete ' + product().name"
        (click)="removeProduct.emit(product().id)"
      >
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
  styleUrl: './product-item.scss',
})
export class ProductItemComponent {
  product = input.required<ProductItemData>();
  removeProduct = output<number>();
}
