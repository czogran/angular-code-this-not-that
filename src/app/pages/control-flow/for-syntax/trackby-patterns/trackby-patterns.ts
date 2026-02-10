import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { PriceCellComponent } from './price-cell';
import { P } from '@angular/cdk/keycodes';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-trackby-patterns',
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgFor, PriceCellComponent],
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
        </div>

        <div class="example-section">
          <h3 class="section-header" (click)="toggleSection('ngfor')">
            <span>*ngFor without trackBy (re-renders whole row)</span>
            <mat-icon>{{ expandedSections()['ngfor'] ? 'expand_less' : 'expand_more' }}</mat-icon>
          </h3>

          @if (expandedSections()['ngfor']) {
            <div *ngFor="let product of products()" class="product-item">
              <span class="id">ID: {{ product.id }}</span>
              <span class="name">{{ product.name }}</span>
              <app-price-cell [price]="product.price" />
              <button mat-icon-button color="warn" (click)="removeProductById(product.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          }
        </div>

        <div class="example-section">
          <h3 class="section-header" (click)="toggleSection('id')">
            <span>&#64;for with track by id (recommended)</span>
            <mat-icon>{{ expandedSections()['id'] ? 'expand_less' : 'expand_more' }}</mat-icon>
          </h3>
          @if (expandedSections()['id']) {
            @for (product of products(); track product.id) {
              <div class="product-item">
                <span class="id">ID: {{ product.id }}</span>
                <span class="name">{{ product.name }}</span>
                <app-price-cell [price]="product.price" />
                <button mat-icon-button color="warn" (click)="removeProductById(product.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            }
          }
        </div>

        <div class="example-section">
          <h3 class="section-header" (click)="toggleSection('index')">
            <span>&#64;for with track by $index</span>
            <mat-icon>{{ expandedSections()['index'] ? 'expand_less' : 'expand_more' }}</mat-icon>
          </h3>
          @if (expandedSections()['index']) {
            @for (product of products(); track $index) {
              <div class="product-item">
                <span class="id">ID: {{ product.id }}</span>
                <span class="name">{{ product.name }}</span>
                <app-price-cell [price]="product.price" />
                <button mat-icon-button color="warn" (click)="removeProductById(product.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            }
          }
        </div>

        <div class="example-section">
          <h3 class="section-header" (click)="toggleSection('reference')">
            <span>&#64;for with track by reference</span>
            <mat-icon>{{
              expandedSections()['reference'] ? 'expand_less' : 'expand_more'
            }}</mat-icon>
          </h3>
          @if (expandedSections()['reference']) {
            @for (product of products(); track product) {
              <div class="product-item">
                <span class="id">ID: {{ product.id }}</span>
                <span class="name">{{ product.name }}</span>
                <app-price-cell [price]="product.price" />
                <button mat-icon-button color="warn" (click)="removeProductById(product.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            }
          }
        </div>
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
  updatedProductIds = signal<Set<number>>(new Set());

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

  removeProductById(id: number) {
    this.products.update((products) => products.filter((p) => p.id !== id));
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

    if (updatedProductId !== undefined) {
      this.updatedProductIds.update((ids) => new Set(ids).add(updatedProductId));
      setTimeout(() => {
        this.updatedProductIds.update((ids) => {
          const newIds = new Set(ids);
          newIds.delete(updatedProductId);
          return newIds;
        });
      }, 1500);
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
