import { Component, Input, ElementRef, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewchild-decorator-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  template: `
    <mat-card [ngClass]="cardClass()">
      <mat-card-header>
        <mat-card-title>{{ title() }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          <strong>targetComponent (static):</strong>
          <!-- {{ targetComponentStatic?.getSecretValue() ?? 'undefined' }} -->
        </p>
        <p>
          <strong>localParagraph (static):</strong>
          {{ getTextContent(localParagraphStatic()) }}
        </p>
        <p>
          <strong>methodValue:</strong>
          {{ methodValue() }}
        </p>
        <p>
          <strong>elementValue:</strong>
          {{ elementValue() }}
        </p>
        <p>
          <strong>elementDelayedValue:</strong>
          {{ elementDelayedValue() }}
        </p>
        <p>
          <strong>localValue:</strong>
          {{ localValue() }}
        </p>
      </mat-card-content>
    </mat-card>
  `,
})
export class ViewChildDecoratorCardComponent {
  title = input.required<string>();
  cardClass = input.required<string>();
  methodValue = input.required<string>();
  elementValue = input.required<string>();
  elementDelayedValue = input.required<string>();
  localValue = input.required<string>();
  targetComponentStatic = input.required<any>();
  localParagraphStatic = input.required<ElementRef<HTMLElement>>();

  getTextContent(el?: ElementRef<HTMLElement>): string {
    return el?.nativeElement?.textContent?.trim() ?? 'undefined';
  }
}
