import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
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
        <p>I am the target component for ViewChild queries</p>

        <div class="example-section">
          <h3>Internal Template Elements</h3>
          <p #secretParagraph class="secret">🔒 Secret value in template: {{ getSecretValue() }}</p>
          @if (showDelayed) {
            <p #secretParagraphDelayed class="secret">
              ⏳ Delayed secret: {{ getSecretValue() }} (after 1s)
            </p>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class ViewChildTargetComponent {
  secretElement1 = viewChild<ElementRef<HTMLParagraphElement>>('secretParagraph');

  secretElement = viewChild<ElementRef<HTMLElement>>('secretParagraph');
  secretElementDelayed = viewChild<ElementRef>('secretParagraphDelayed');

  @ViewChild('secretParagraph', { static: false })
  secretElementDelayed1!: ElementRef<HTMLElement>;

  getSecretInnerText(): string | undefined {
    const ref = this.secretElement();
    const value = this.secretElement1()?.nativeElement.textContent;
    console.log('ref?.nativeElement.innerText', value);
    return ref?.nativeElement.innerText ? ref.nativeElement.innerText.trim() : 'undefined';
  }

  showDelayed = false;

  constructor() {
    setTimeout(() => {
      this.showDelayed = true;
    }, 1000);
  }

  getSecretValue = signal('Secret: 42');

  ngAfterViewInit() {
    console.log('secretElementDelayed1', this.secretElementDelayed1.nativeElement.textContent);
    console.log('ref?.nativeElement.innerText', this.secretElement()?.nativeElement.textContent);
  }
}
