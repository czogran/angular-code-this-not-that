import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  PerformanceComparisonComponent,
  type CodeBlock,
  type Metric,
} from '../performance-comparison/performance-comparison';

@Component({
  selector: 'app-switch-performance-comparison',
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
export class SwitchPerformanceComparisonComponent {
  performanceTitle = '🚀 Performance: *ngSwitch vs @switch';

  oldWayCode: CodeBlock = {
    title: '*ngSwitch - Requires Runtime Directives',
    code: `import { NgSwitch, NgSwitchCase, NgSwitchDefault } 
  from '@angular/common';

@Component({
  imports: [
    NgSwitch,       // Runtime dependency
    NgSwitchCase,   // Runtime dependency
    NgSwitchDefault // Runtime dependency
  ],
  template: \`
    <div [ngSwitch]="status">
      <div *ngSwitchCase="'pending'">...</div>
      <div *ngSwitchCase="'approved'">...</div>
      <div *ngSwitchDefault>...</div>
    </div>
  \`
})`,
  };

  newWayCode: CodeBlock = {
    title: '@switch - Built-in (No Imports Needed)',
    code: `@Component({
  imports: [],  // No directives needed!
  template: \`
    @switch (status) {
      @case ('pending') {
        <div>...</div>
      }
      @case ('approved') {
        <div>...</div>
      }
      @default {
        <div>...</div>
      }
    }
  \`
})`,
  };

  performanceMetrics: Metric[] = [
    {
      label: 'Bundle Impact:',
      value: '*ngSwitch adds ~2KB (3 directives) | @switch adds 0KB',
    },
    {
      label: 'Runtime Cost:',
      value: '*ngSwitch creates 3+ directive instances | @switch is compile-time only',
    },
    {
      label: 'Readability:',
      value:
        '*ngSwitch requires [ngSwitch] attribute + structural directives | @switch is native syntax',
    },
  ];
}
