import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { ProductItemComponent } from './product-item';
import { ExampleSectionComponent } from './example-section';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-trackby-patterns',
  imports: [MatCardModule, MatButtonModule, NgFor, ProductItemComponent, ExampleSectionComponent],
  styleUrl: './trackby-patterns.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>TrackBy Patterns</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="button-group">
          <button mat-raised-button color="primary" (click)="addProduct()">Add Product</button>
          <button mat-raised-button color="warn" (click)="removeProduct()">Remove Product</button>
          <button mat-raised-button color="accent" (click)="refreshProducts()">
            Refresh Products
          </button>
          <button mat-raised-button color="accent" (click)="updatePrice()">Update Price</button>
          <button mat-raised-button color="accent" (click)="reverseOrder()">Reverse Order</button>
        </div>

        <app-example-section
          title="*ngFor without trackBy (re-renders whole row)"
          fragment="ngfor"
          [expanded]="expandedSections()['ngfor']"
          (toggleExpanded)="toggleSection('ngfor')"
        >
          <ng-container *ngFor="let product of products()">
            <app-product-item [product]="product" (removeProduct)="removeProductById($event)" />
          </ng-container>
        </app-example-section>

        <app-example-section
          title="@for with track by id (recommended)"
          fragment="track-by-id"
          [expanded]="expandedSections()['id']"
          (toggleExpanded)="toggleSection('id')"
        >
          @for (product of products(); track product.id) {
            <app-product-item [product]="product" (removeProduct)="removeProductById($event)" />
          }
        </app-example-section>

        <app-example-section
          title="@for with track by $index"
          fragment="track-by-index"
          [expanded]="expandedSections()['index']"
          (toggleExpanded)="toggleSection('index')"
        >
          @for (product of products(); track $index) {
            <app-product-item [product]="product" (removeProduct)="removeProductById($event)" />
          }
        </app-example-section>

        <app-example-section
          title="@for with track by reference"
          fragment="track-by-reference"
          [expanded]="expandedSections()['reference']"
          (toggleExpanded)="toggleSection('reference')"
        >
          @for (product of products(); track product) {
            <app-product-item [product]="product" (removeProduct)="removeProductById($event)" />
          }
        </app-example-section>
      </mat-card-content>
    </mat-card>
  `,
})
export class TrackbyPatternsComponent {
  private baseProducts: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 },
  ];

  private nextId = 4;

  products = signal<Product[]>([...this.baseProducts]);
  expandedSections = signal<Record<string, boolean>>({
    ngfor: true,
    id: true,
    index: true,
    reference: true,
  });

  toggleSection(section: string) {
    this.expandedSections.update((sections) => ({
      ...sections,
      [section]: !sections[section],
    }));
  }

  addProduct() {
    const productNames = ['Monitor', 'Webcam', 'Headset', 'Mousepad', 'Speaker', 'USB Hub'];
    const randomName = productNames[Math.floor(Math.random() * productNames.length)];
    const newProduct: Product = {
      id: this.nextId++,
      name: `${randomName} ${this.nextId - 1}`,
      price: Math.floor(Math.random() * 500) + 50,
    };

    this.products.update((products) => [...products, newProduct]);
  }

  removeProduct() {
    this.products.update((products) => products.slice(0, -1));
  }

  removeProductById(id: number | Event) {
    const productId = typeof id === 'number' ? id : (id as unknown as { id: number }).id;
    this.products.update((products) => products.filter((p) => p.id !== productId));
  }

  refreshProducts() {
    const newProducts = this.products().map((p) => ({ ...p }));
    this.products.set(newProducts);
  }

  updatePrice() {
    const randomIndex = Math.floor(Math.random() * this.products().length);
    const newPrice = Math.floor(Math.random() * 1000) + 50;
    const updatedProductId = this.products()[randomIndex]?.id;

    this.products.update((products) =>
      products.map((p, i) => {
        if (i === randomIndex) {
          p.price = newPrice;
          return p;
        }
        return p;
      }),
    );
  }

  reverseOrder() {
    this.products.update((products) => products.reverse());
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
