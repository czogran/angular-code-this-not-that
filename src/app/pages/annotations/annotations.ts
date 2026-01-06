import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionNavComponent } from '../../shared/section-nav/section-nav';
import { ANNOTATIONS_ROUTES } from './annotations-routing';

@Component({
  selector: 'app-annotations',
  imports: [RouterModule, SectionNavComponent],
  styleUrl: './annotations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-section-nav
      title="Annotations"
      [tabs]="[
        { label: 'Input', routerLink: 'input' },
        { label: 'ViewChild', routerLink: 'viewchild' },
      ]"
    />
  `,
})
export class AnnotationsComponent {
  static routes = ANNOTATIONS_ROUTES;
}
