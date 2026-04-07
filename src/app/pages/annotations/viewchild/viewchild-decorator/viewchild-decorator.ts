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
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ViewChildTargetComponent } from '../viewchild-target/viewchild-target';
import { ViewChildDecoratorCardComponent } from './viewchild-decorator-card';

@Component({
  selector: 'app-viewchild-signal',
  standalone: true,
  imports: [
    MatCardModule,
    ViewChildTargetComponent,
    ViewChildDecoratorCardComponent, // add new component
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p #localParagraph class="local">Local secret 456</p>
    <app-viewchild-target />
    <div class="example-section">
      <h3>@ViewChild Decorator (all lifecycle stages)</h3>
      <div class="hooks-grid">
        <app-viewchild-decorator-card
          [title]="'❌ Constructor'"
          cardClass="error"
          [methodValue]="constructorMethodValue()"
          [elementValue]="constructorElementValue()"
          [elementDelayedValue]="constructorElementDelayedValue()"
          [localValue]="constructorLocalValue()"
          [targetComponentStatic]="targetComponentStatic"
          [localParagraphStatic]="localParagraphStatic"
        ></app-viewchild-decorator-card>
        <app-viewchild-decorator-card
          [title]="'❌ ngOnInit'"
          cardClass="error"
          [methodValue]="onInitMethodValue()"
          [elementValue]="onInitElementValue()"
          [elementDelayedValue]="onInitElementDelayedValue()"
          [localValue]="onInitLocalValue()"
          [targetComponentStatic]="targetComponentStatic"
          [localParagraphStatic]="localParagraphStatic"
        ></app-viewchild-decorator-card>
        <app-viewchild-decorator-card
          [title]="'❌ ngAfterContentInit'"
          cardClass="error"
          [methodValue]="afterContentInitMethodValue()"
          [elementValue]="afterContentInitElementValue()"
          [elementDelayedValue]="afterContentInitElementDelayedValue()"
          [localValue]="afterContentInitLocalValue()"
          [targetComponentStatic]="targetComponentStatic"
          [localParagraphStatic]="localParagraphStatic"
        ></app-viewchild-decorator-card>
        <app-viewchild-decorator-card
          [title]="'✅ ngAfterViewInit'"
          cardClass="success"
          [methodValue]="afterViewInitMethodValue()"
          [elementValue]="afterViewInitElementValue()"
          [elementDelayedValue]="afterViewInitElementDelayedValue()"
          [localValue]="afterViewInitLocalValue()"
          [targetComponentStatic]="targetComponentStatic"
          [localParagraphStatic]="localParagraphStatic"
        ></app-viewchild-decorator-card>
      </div>
    </div>
  `,
})
export class ViewChildDecoratorComponent implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild(ViewChildTargetComponent) targetComponent!: ViewChildTargetComponent; // dynamic (default)
  @ViewChild('localParagraph') localParagraph!: ElementRef<HTMLElement>; // dynamic (default)

  // Add static ViewChilds
  @ViewChild(ViewChildTargetComponent, { static: true })
  targetComponentStatic!: ViewChildTargetComponent;
  @ViewChild('localParagraph', { static: true }) localParagraphStatic!: ElementRef<HTMLElement>;

  get secretElement() {
    return this.targetComponent?.secretElement();
  }

  get secretElementDelayed() {
    return this.targetComponent?.secretElementDelayed();
  }

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


  effectMethodValue = signal('undefined');
  effectElementValue = signal('undefined');
  effectElementDelayedValue = signal('undefined');
  effectLocalValue = signal('undefined');
  effectRunCount = signal(0);

  constructor() {
    effect(() => {
      this.effectMethodValue.set(this.targetComponent?.getSecretValue() ?? '');
      console.log(
        'this.targetComponent()?.secretElement()',
        this.targetComponent?.getSecretInnerText(),
        this.targetComponent?.secretElement()?.nativeElement['innerText'],
        this.targetComponent?.secretElement()?.nativeElement.innerHTML,
      );
      this.effectElementValue.set(getTextContent(this.secretElement));
      this.effectElementDelayedValue.set(getTextContent(this.secretElementDelayed));
      this.effectLocalValue.set(getTextContent(this.localParagraph));
    });

    this.constructorMethodValue.set(this.targetComponent?.getSecretValue() ?? '');
    this.constructorElementValue.set(getTextContent(this.secretElement));
    this.constructorElementDelayedValue.set(getTextContent(this.secretElementDelayed));
    this.constructorLocalValue.set(getTextContent(this.localParagraph));
  }

  ngOnInit() {
    this.onInitMethodValue.set(this.targetComponent?.getSecretValue() ?? '');
    this.onInitElementValue.set(getTextContent(this.secretElement));
    this.onInitElementDelayedValue.set(getTextContent(this.secretElementDelayed));
    this.onInitLocalValue.set(getTextContent(this.localParagraph));
  }

  ngAfterContentInit() {
    this.afterContentInitMethodValue.set(this.targetComponent?.getSecretValue() ?? '');
    this.afterContentInitElementValue.set(getTextContent(this.secretElement));
    this.afterContentInitElementDelayedValue.set(getTextContent(this.secretElementDelayed));
    this.afterContentInitLocalValue.set(getTextContent(this.localParagraph));
  }

  ngAfterViewInit() {
    this.afterViewInitMethodValue.set(this.targetComponent?.getSecretValue() ?? '');
    this.afterViewInitElementValue.set(getTextContent(this.secretElement));
    this.afterViewInitElementDelayedValue.set(getTextContent(this.secretElementDelayed));
    this.afterViewInitLocalValue.set(getTextContent(this.localParagraph));
  }
}

function getTextContent(el?: ElementRef<HTMLElement> | undefined): string {
  return el?.nativeElement?.textContent?.trim() ?? 'undefined';
}
