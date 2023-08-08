import { Component, ContentChildren, ElementRef, Input, QueryList } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

	@ContentChildren('header', { read: ElementRef }) headerContent!: ElementRef;
	@ContentChildren('body', { read: ElementRef }) bodyContent!: ElementRef;
	@ContentChildren('actions', { read: ElementRef }) actionsContent!: ElementRef;
	@ContentChildren('footer', { read: ElementRef }) footerContent!: ElementRef;

	@Input() actionAlign: 'start' | 'end' = 'start';

	hasHeader(): boolean {
		return !!this.headerContent;
	}

	hasBody(): boolean {
		return !!this.bodyContent;
	}

	hasActions(): boolean {
		return !!this.actionsContent;
	}

	hasFooter(): boolean {
		return !!this.footerContent;
	}
}
