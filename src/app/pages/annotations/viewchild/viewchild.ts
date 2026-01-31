import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  computed,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ViewChildTargetComponent } from './viewchild-target';

@Component({
  selector: 'app-viewchild',
  imports: [MatCardModule, ViewChildTargetComponent],
  styleUrl: './viewchild.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>ViewChild Lifecycle Timing</mat-card-title>
        <mat-card-subtitle
          >viewChild() signal availability across lifecycle hooks</mat-card-subtitle
        >
      </mat-card-header>
      <mat-card-content>
        <p>
          The viewChild() signal becomes available at different points in the component lifecycle.
          This demonstration shows when it's safe to access viewChild() queries.
        </p>

        <div class="example-section">
          <h3>Local Template Reference</h3>
          <p #localParagraph class="local">Local secret 456</p>
        </div>

        <div class="example-section">
          <h3>Lifecycle Hook Comparison</h3>
          <div class="hooks-grid">
            <mat-card>
              <mat-card-header>
                <mat-card-title>❌ Constructor</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p><strong>Via getSecretValue():</strong> {{ constructorMethodValue() }}</p>
                <p><strong>Via secretElement():</strong> {{ constructorElementValue() }}</p>
                <p><strong>localParagraph():</strong> {{ constructorLocalValue() }}</p>
                <p>
                  <strong>localParagraphOldSyntax():</strong>
                  {{ constructorSecretValueOldSyntax() }}
                </p>
                <p><strong>secretParagraph():</strong> {{ constructorSecretValue() }}</p>
              </mat-card-content>
            </mat-card>

            <mat-card>
              <mat-card-header>
                <mat-card-title>❌ ngOnInit</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p><strong>Via getSecretValue():</strong> {{ onInitMethodValue() }}</p>
                <p><strong>Via secretElement():</strong> {{ onInitElementValue() }}</p>
                <p><strong>localParagraph():</strong> {{ onInitLocalValue() }}</p>
                <p>
                  <strong>localParagraphOldSyntax():</strong> {{ onInitSecretValueOldSyntax() }}
                </p>
                <p><strong>secretParagraph():</strong> {{ onInitSecretValue() }}</p>
              </mat-card-content>
            </mat-card>

            <mat-card>
              <mat-card-header>
                <mat-card-title>❌ ngAfterContentInit</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p><strong>Via getSecretValue():</strong> {{ afterContentInitMethodValue() }}</p>
                <p><strong>Via secretElement():</strong> {{ afterContentInitElementValue() }}</p>
                <p><strong>localParagraph():</strong> {{ afterContentInitLocalValue() }}</p>
                <p>
                  <strong>localParagraphOldSyntax():</strong>
                  {{ afterContentInitSecretValueOldSyntax() }}
                </p>
                <p><strong>secretParagraph():</strong> {{ afterContentInitSecretValue() }}</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="success">
              <mat-card-header>
                <mat-card-title>✅ ngAfterViewInit</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p><strong>Via getSecretValue():</strong> {{ afterViewInitMethodValue() }}</p>
                <p><strong>Via secretElement():</strong> {{ afterViewInitElementValue() }}</p>
                <p><strong>localParagraph():</strong> {{ afterViewInitLocalValue() }}</p>
                <p>
                  <strong>localParagraphOldSyntax():</strong>
                  {{ afterViewInitSecretValueOldSyntax() }}
                </p>
                <p><strong>secretParagraph():</strong> {{ afterViewInitSecretValue() }}</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="computed">
              <mat-card-header>
                <mat-card-title>🔄 computed()</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p><strong>Via getSecretValue():</strong> {{ computedMethodValue() }}</p>
                <p><strong>Via secretElement():</strong> {{ computedElementValue() }}</p>
                <p><strong>localParagraph():</strong> {{ computedLocalValue() }}</p>
                <p><strong>secretParagraph():</strong> {{ computedSecretValue() }}</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="effect">
              <mat-card-header>
                <mat-card-title>⚡ effect()</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p><strong>Via getSecretValue():</strong> {{ effectMethodValue() }}</p>
                <p><strong>Via secretElement():</strong> {{ effectElementValue() }}</p>
                <p><strong>localParagraph():</strong> {{ effectLocalValue() }}</p>
                <p><strong>secretParagraph():</strong> {{ effectSecretValue() }}</p>
                <p><strong>Run count:</strong> {{ effectRunCount() }}</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </mat-card-content>
    </mat-card>

    <app-viewchild-target> </app-viewchild-target>
  `,
})
export class ViewChildComponent implements OnInit, AfterContentInit, AfterViewInit {
  targetComponent = viewChild(ViewChildTargetComponent);
  secretParagraph = viewChild<ElementRef<HTMLParagraphElement>>('secretParagraph');
  localParagraph = viewChild<ElementRef<HTMLParagraphElement>>('localParagraph');
  @ViewChild('localParagraph')
  localParagraphOldSyntax!: ElementRef<HTMLParagraphElement>;

  constructorMethodValue = signal('undefined');
  constructorElementValue = signal('undefined');
  constructorLocalValue = signal('undefined');
  constructorSecretValue = signal('undefined');
  constructorSecretValueOldSyntax = signal('undefined');

  onInitMethodValue = signal('undefined');
  onInitElementValue = signal('undefined');
  onInitLocalValue = signal('undefined');
  onInitSecretValue = signal('undefined');
  onInitSecretValueOldSyntax = signal('undefined');

  afterContentInitMethodValue = signal('undefined');
  afterContentInitElementValue = signal('undefined');
  afterContentInitLocalValue = signal('undefined');
  afterContentInitSecretValue = signal('undefined');
  afterContentInitSecretValueOldSyntax = signal('undefined');

  afterViewInitMethodValue = signal('undefined');
  afterViewInitElementValue = signal('undefined');
  afterViewInitLocalValue = signal('undefined');
  afterViewInitSecretValue = signal('undefined');
  afterViewInitSecretValueOldSyntax = signal('undefined');

  computedMethodValue = computed(() => {
    const component = this.targetComponent();
    return component ? component.getSecretValue() : 'undefined';
  });

  computedElementValue = computed(() => {
    const component = this.targetComponent();
    const element = component?.secretElement();
    return element ? element.nativeElement.textContent.trim() : 'undefined';
  });

  computedLocalValue = computed(() => {
    const local = this.localParagraph();
    return local ? local.nativeElement.textContent.trim() : 'undefined';
  });

  computedSecretValue = computed(() => {
    const secret = this.secretParagraph();
    return secret ? secret.nativeElement.textContent.trim() : 'undefined';
  });

  effectMethodValue = signal('undefined');
  effectElementValue = signal('undefined');
  effectLocalValue = signal('undefined');
  effectSecretValue = signal('undefined');
  effectRunCount = signal(0);

  constructor() {
    effect(() => {
      const component = this.targetComponent();
      this.effectMethodValue.set(component ? component.getSecretValue() : 'undefined');

      const element = component?.secretElement();
      this.effectElementValue.set(element ? element.nativeElement.textContent.trim() : 'undefined');

      const local = this.localParagraph();
      this.effectLocalValue.set(local ? local.nativeElement.textContent.trim() : 'undefined');

      const secret = this.secretParagraph();
      this.effectSecretValue.set(secret ? secret.nativeElement.textContent.trim() : 'undefined');

      this.effectRunCount.update((c) => c + 1);
    });

    const component = this.targetComponent();
    this.constructorMethodValue.set(component ? component.getSecretValue() : 'undefined');

    const element = component?.secretElement();
    this.constructorElementValue.set(
      element ? element.nativeElement.textContent.trim() : 'undefined',
    );

    const local = this.localParagraph();
    this.constructorLocalValue.set(local ? local.nativeElement.textContent.trim() : 'undefined');

    this.constructorSecretValueOldSyntax.set(
      this.localParagraphOldSyntax?.nativeElement.textContent.trim() || 'undefined',
    );

    const secret = this.secretParagraph();
    this.constructorSecretValue.set(secret ? secret.nativeElement.textContent.trim() : 'undefined');
  }

  ngOnInit() {
    const component = this.targetComponent();
    this.onInitMethodValue.set(component ? component.getSecretValue() : 'undefined');

    const element = component?.secretElement();
    this.onInitElementValue.set(element ? element.nativeElement.textContent.trim() : 'undefined');

    const local = this.localParagraph();
    this.onInitLocalValue.set(local ? local.nativeElement.textContent.trim() : 'undefined');

    this.onInitSecretValueOldSyntax.set(
      this.localParagraphOldSyntax?.nativeElement.textContent.trim(),
    );

    const secret = this.secretParagraph();
    this.onInitSecretValue.set(secret ? secret.nativeElement.textContent.trim() : 'undefined');
  }

  ngAfterContentInit() {
    const component = this.targetComponent();
    this.afterContentInitMethodValue.set(component ? component.getSecretValue() : 'undefined');

    const element = component?.secretElement();
    this.afterContentInitElementValue.set(
      element ? element.nativeElement.textContent.trim() : 'undefined',
    );

    const local = this.localParagraph();
    this.afterContentInitLocalValue.set(
      local ? local.nativeElement.textContent.trim() : 'undefined',
    );

    this.afterContentInitSecretValueOldSyntax.set(
      this.localParagraphOldSyntax?.nativeElement.textContent.trim() || 'undefined',
    );

    const secret = this.secretParagraph();
    this.afterContentInitSecretValue.set(
      secret ? secret.nativeElement.textContent.trim() : 'undefined',
    );
  }

  ngAfterViewInit() {
    const component = this.targetComponent();
    this.afterViewInitMethodValue.set(component ? component.getSecretValue() : 'undefined');

    const element = component?.secretElement();
    this.afterViewInitElementValue.set(
      element ? element.nativeElement.textContent.trim() : 'undefined',
    );

    const local = this.localParagraph();
    this.afterViewInitLocalValue.set(local ? local.nativeElement.textContent.trim() : 'undefined');

    this.afterViewInitSecretValueOldSyntax.set(
      this.localParagraphOldSyntax.nativeElement.textContent.trim(),
    );

    const secret = this.secretParagraph();
    this.afterViewInitSecretValue.set(
      secret ? secret.nativeElement.textContent.trim() : 'undefined',
    );
  }
}
