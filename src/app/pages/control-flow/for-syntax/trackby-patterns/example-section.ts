import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-example-section',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './example-section.scss',
  host: { '[id]': 'fragment()' },
  template: `
    <div class="example-section">
      <h3 class="section-header" (click)="onHeaderClick()">
        <span>{{ title() }}</span>
        <mat-icon>{{ expanded() ? 'expand_less' : 'expand_more' }}</mat-icon>
      </h3>
      @if (expanded()) {
        <ng-content />
      }
    </div>
  `,
})
export class ExampleSectionComponent {
  title = input.required<string>();
  fragment = input<string>();
  expanded = input(true);
  toggleExpanded = output<void>();

  private readonly router = inject(Router);

  onHeaderClick() {
    const f = this.fragment();
    if (f) {
      this.router.navigate([], { fragment: f, replaceUrl: true });
    }
    this.toggleExpanded.emit();
  }
}
