import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-viewchild-target',
  imports: [MatCardModule],
  styleUrl: './viewchild-target.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Target Component</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>{{ message }}</p>

        <div class="example-section">
          <h3>Internal Template Elements</h3>
          <p #secretParagraph class="secret">🔒 Secret value in template: {{ getSecretValue() }}</p>

          <div class="viewchild-info">
            <h4>Local viewChild Query:</h4>
            <p>
              <strong>Direct method:</strong>
              {{ getSecretValue() }}
            </p>
            <p>
              <strong>Element textContent:</strong>
              {{
                secretElement() ? secretElement()!.nativeElement.textContent.trim() : 'undefined'
              }}
            </p>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class ViewChildTargetComponent {
  message = 'I am the target component for ViewChild queries';
  secretElement = viewChild<ElementRef<HTMLParagraphElement>>('secretParagraph');

  getSecretValue(): string {
    return 'Secret: 42';
  }
}
