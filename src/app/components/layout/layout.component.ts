import { Component, AfterContentInit, ContentChild, ContentChildren, ElementRef, Input, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterContentInit, AfterViewInit {

	@ContentChildren('header', { read: ElementRef }) headerContents: ElementRef | undefined;
	// @ContentChildren('body', { read: ElementRef }) bodyContent: ElementRef | undefined;
	// @ContentChildren('actions', { read: ElementRef }) actionsContent: ElementRef | undefined;
	// @ContentChildren('footer', { read: ElementRef }) footerContent: ElementRef | undefined;

	@ContentChild('header') headerContent: ElementRef | undefined;
	@ContentChild('body') bodyContent: ElementRef | undefined;
	@ContentChild('actions') actionsContent: ElementRef | undefined;
	@ContentChild('footer') footerContent: ElementRef | undefined;

	@Input() actionAlign: 'start' | 'end' = 'start';

	ngAfterContentInit() {
		console.log('headerContent', this.headerContent);
		if (this.headerContent) {
		  console.log("Le contenu de header est utilisé !");
		} else {
		  console.log("Le contenu de header n'est pas utilisé.");
		}
	}
	ngAfterViewInit(): void {
		console.log('headerContent', this.headerContent);
		console.log('headerContents', this.headerContents);
		// console.log('bodyContent', this.bodyContent);
		// console.log('actionsContent', this.actionsContent);
		// console.log('footerContent', this.footerContent);
	}

	hasHeader(): boolean {
		return !!this.headerContent;
	}

	hasBody(): boolean {
		// return !!this.bodyContent;
		return !!this.bodyContent;
	}

	hasActions(): boolean {
		// console.log('hasActions', this.actionsContent)
		// return !!this.actionsContent;
		return !!this.actionsContent;
	}

	hasFooter(): boolean {
		// return !!this.footerContent;
		return !!this.footerContent;
	}
}
