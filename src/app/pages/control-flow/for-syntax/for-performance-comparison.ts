import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PerformanceComparisonComponent,
  type CodeBlock,
  type Metric,
} from '../performance-comparison/performance-comparison';

@Component({
  selector: 'app-for-performance-comparison',
  imports: [PerformanceComparisonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-performance-comparison
      [title]="performanceTitle"
      [oldWay]="oldWayCode"
      [newWay]="newWayCode"
      [metrics]="performanceMetrics"
    />
  `,
})
export class ForPerformanceComparisonComponent {
  performanceTitle = '🚀 Performance: *ngFor vs @for';

  oldWayCode: CodeBlock = {
    title: '*ngFor - Requires Runtime Directive',
    code: `import { NgFor } from '@angular/common';

@Component({
  imports: [NgFor],  // Runtime dependency
  template: \`
    <div *ngFor="let item of items; 
                 trackBy: trackByFn">
      {{ item }}
    </div>
  \`
})
export class MyComponent {
  trackByFn(index: number, item: any) {
    return item.id;
  }
}`,
  };

  newWayCode: CodeBlock = {
    title: '@for - Built-in (No Import Needed)',
    code: `@Component({
  imports: [],  // No directive needed!
  template: \`
    @for (item of items; track item.id) {
      <div>{{ item }}</div>
    } @empty {
      <p>No items</p>
    }
  \`
})
export class MyComponent {
  // No trackBy method needed!
}`,
  };

  performanceMetrics: Metric[] = [
    {
      label: 'Bundle Impact:',
      value: '*ngFor adds ~1.5KB | @for adds 0KB',
    },
    {
      label: 'Runtime Cost:',
      value: '*ngFor creates directive instance | @for is compile-time only',
    },
    {
      label: 'Developer Experience:',
      value: '*ngFor requires trackBy method | @for uses inline track expression',
    },
    {
      label: 'Empty State:',
      value: '*ngFor needs separate *ngIf | @for has built-in @empty block',
    },
  ];
}
