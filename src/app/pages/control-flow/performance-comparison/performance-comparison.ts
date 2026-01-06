import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface CodeBlock {
  title: string;
  code: string;
}

export interface Metric {
  label: string;
  value: string;
}

@Component({
  selector: 'app-performance-comparison',
  imports: [MatButtonModule, MatIconModule],
  styleUrl: './performance-comparison.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="performance-info">
      <div class="header" (click)="toggleExpanded()">
        <h3>{{ title() }}</h3>
        <button mat-icon-button>
          <mat-icon>{{ expanded() ? 'expand_less' : 'expand_more' }}</mat-icon>
        </button>
      </div>

      @if (expanded()) {
        <div class="content">
          <div class="comparison-grid">
            <div class="code-block">
              <h4>{{ oldWay().title }}</h4>
              <pre><code>{{ oldWay().code }}</code></pre>
            </div>
            <div class="code-block">
              <h4>{{ newWay().title }}</h4>
              <pre><code>{{ newWay().code }}</code></pre>
            </div>
          </div>

          <div class="metrics">
            @for (metric of metrics(); track metric.label) {
              <div class="metric">
                <strong>{{ metric.label }}</strong>
                <span>{{ metric.value }}</span>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class PerformanceComparisonComponent {
  title = input.required<string>();
  oldWay = input.required<CodeBlock>();
  newWay = input.required<CodeBlock>();
  metrics = input.required<Metric[]>();

  expanded = signal(false);

  toggleExpanded() {
    this.expanded.update((v) => !v);
  }
}
