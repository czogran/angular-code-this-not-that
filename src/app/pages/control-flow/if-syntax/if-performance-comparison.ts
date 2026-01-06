import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PerformanceComparisonComponent,
  type CodeBlock,
  type Metric,
} from '../performance-comparison/performance-comparison';

@Component({
  selector: 'app-if-performance-comparison',
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
export class IfPerformanceComparisonComponent {
  performanceTitle = '🚀 Performance: *ngIf vs @if';

  oldWayCode: CodeBlock = {
    title: '*ngIf - Requires Runtime Directive',
    code: `import { NgIf } from '@angular/common';

@Component({
  imports: [NgIf],  // Runtime dependency
  template: \`
    <div *ngIf="condition">
      Content
    </div>
  \`
})`,
  };

  newWayCode: CodeBlock = {
    title: '@if - Built-in (No Import Needed)',
    code: `@Component({
  imports: [],  // No directive needed!
  template: \`
    @if (condition) {
      <div>Content</div>
    }
  \`
})`,
  };

  performanceMetrics: Metric[] = [
    {
      label: 'Bundle Impact:',
      value: '*ngIf adds ~1.5KB | @if adds 0KB',
    },
    {
      label: 'Runtime Cost:',
      value: '*ngIf creates directive instance | @if is compile-time only',
    },
  ];
}
