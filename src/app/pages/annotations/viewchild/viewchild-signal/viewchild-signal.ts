import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  computed,
  effect,
  signal,
  viewChild,
  Input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ViewChildTargetComponent } from '../viewchild-target/viewchild-target';
import { ViewChildSignalCardComponent } from './viewchild-signal-card';

// --- Main component ---
@Component({
  selector: 'app-viewchild-signal',
  standalone: true,
  imports: [MatCardModule, ViewChildTargetComponent, ViewChildSignalCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p #localParagraph class="local">Local secret 456</p>
    <app-viewchild-target />
    <div class="example-section">
      <h3>viewChild() signal</h3>
      <div class="hooks-grid">
        <app-viewchild-signal-card
          title="❌ Constructor"
          [methodValue]="constructorMethodValue()"
          [elementValue]="constructorElementValue()"
          [elementDelayedValue]="constructorElementDelayedValue()"
          [localValue]="constructorLocalValue()"
        ></app-viewchild-signal-card>
        <app-viewchild-signal-card
          title="❌ ngOnInit"
          [methodValue]="onInitMethodValue()"
          [elementValue]="onInitElementValue()"
          [elementDelayedValue]="onInitElementDelayedValue()"
          [localValue]="onInitLocalValue()"
        ></app-viewchild-signal-card>
        <app-viewchild-signal-card
          title="❌ ngAfterContentInit"
          [methodValue]="afterContentInitMethodValue()"
          [elementValue]="afterContentInitElementValue()"
          [elementDelayedValue]="afterContentInitElementDelayedValue()"
          [localValue]="afterContentInitLocalValue()"
        ></app-viewchild-signal-card>
        <app-viewchild-signal-card
          title="✅ ngAfterViewInit"
          cardClass="success"
          [methodValue]="afterViewInitMethodValue()"
          [elementValue]="afterViewInitElementValue()"
          [elementDelayedValue]="afterViewInitElementDelayedValue()"
          [localValue]="afterViewInitLocalValue()"
        ></app-viewchild-signal-card>
        <app-viewchild-signal-card
          title="🔄 computed()"
          cardClass="computed"
          [methodValue]="computedMethodValue()"
          [elementValue]="computedElementValue()"
          [elementDelayedValue]="computedElementDelayedValue()"
          [localValue]="computedLocalValue()"
        ></app-viewchild-signal-card>
        <app-viewchild-signal-card
          title="⚡ effect()"
          cardClass="effect"
          [methodValue]="effectMethodValue()"
          [elementValue]="effectElementValue()"
          [elementDelayedValue]="effectElementDelayedValue()"
          [localValue]="effectLocalValue()"
        ></app-viewchild-signal-card>
      </div>
    </div>
  `,
})
export class ViewChildSignalComponent implements OnInit, AfterContentInit, AfterViewInit {
  targetComponent = viewChild(ViewChildTargetComponent);

  get secretElement() {
    return this.targetComponent()?.secretElement();
  }

  get secretElementDelayed() {
    return this.targetComponent()?.secretElementDelayed();
  }

  localParagraph = viewChild<ElementRef<HTMLParagraphElement>>('localParagraph');

  constructorMethodValue = signal('undefined');
  constructorElementValue = signal('undefined');
  constructorElementDelayedValue = signal('undefined');
  constructorLocalValue = signal('undefined');

  onInitMethodValue = signal('undefined');
  onInitElementValue = signal('undefined');
  onInitElementDelayedValue = signal('undefined');
  onInitLocalValue = signal('undefined');

  afterContentInitMethodValue = signal('undefined');
  afterContentInitElementValue = signal('undefined');
  afterContentInitElementDelayedValue = signal('undefined');
  afterContentInitLocalValue = signal('undefined');

  afterViewInitMethodValue = signal('undefined');
  afterViewInitElementValue = signal('undefined');
  afterViewInitElementDelayedValue = signal('undefined');
  afterViewInitLocalValue = signal('undefined');

  computedMethodValue = computed(() => {
    const component = this.targetComponent();
    return component ? component.getSecretValue() : 'undefined';
  });

  computedElementValue = computed(() => {
    return getTextContent(this.secretElement);
  });

  computedElementDelayedValue = computed(() => {
    return getTextContent(this.secretElementDelayed);
  });

  computedLocalValue = computed(() => {
    return getTextContent(this.localParagraph());
  });

  effectMethodValue = signal('undefined');
  effectElementValue = signal('undefined');
  effectElementDelayedValue = signal('undefined');
  effectLocalValue = signal('undefined');
  effectRunCount = signal(0);

  constructor() {
    effect(() => {
      this.effectMethodValue.set(this.targetComponent()?.getSecretValue() ?? '');
      console.log(
        'this.targetComponent()?.secretElement()',
        this.targetComponent()?.getSecretInnerText(),
        this.targetComponent()?.secretElement()?.nativeElement['innerText'],
        this.targetComponent()?.secretElement()?.nativeElement.innerHTML,
      );
      this.effectElementValue.set(getTextContent(this.secretElement));
      this.effectElementDelayedValue.set(getTextContent(this.secretElementDelayed));
      this.effectLocalValue.set(getTextContent(this.localParagraph()));
    });

    this.constructorMethodValue.set(this.targetComponent()?.getSecretValue() ?? '');
    this.constructorElementValue.set(getTextContent(this.secretElement));
    this.constructorElementDelayedValue.set(getTextContent(this.secretElementDelayed));
    this.constructorLocalValue.set(getTextContent(this.localParagraph()));
  }

  ngOnInit() {
    this.onInitMethodValue.set(this.targetComponent()?.getSecretValue() ?? '');
    this.onInitElementValue.set(getTextContent(this.secretElement));
    this.onInitElementDelayedValue.set(getTextContent(this.secretElementDelayed));
    this.onInitLocalValue.set(getTextContent(this.localParagraph()));
  }

  ngAfterContentInit() {
    this.afterContentInitMethodValue.set(this.targetComponent()?.getSecretValue() ?? '');
    this.afterContentInitElementValue.set(getTextContent(this.secretElement));
    this.afterContentInitElementDelayedValue.set(getTextContent(this.secretElementDelayed));
    this.afterContentInitLocalValue.set(getTextContent(this.localParagraph()));
  }

  ngAfterViewInit() {
    this.afterViewInitMethodValue.set(this.targetComponent()?.getSecretValue() ?? '');
    this.afterViewInitElementValue.set(getTextContent(this.secretElement));
    this.afterViewInitElementDelayedValue.set(getTextContent(this.secretElementDelayed));
    this.afterViewInitLocalValue.set(getTextContent(this.localParagraph()));
  }
}

function getTextContent(el?: ElementRef<HTMLElement> | undefined): string {
  return el?.nativeElement?.textContent?.trim() ?? 'undefined';
}
