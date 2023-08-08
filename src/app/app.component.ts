import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';


export interface Tile {
	color: string;
	cols: number;
	rows: number;
	text: string;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	
	@ViewChild('header') header: ElementRef | undefined;
	@ViewChild('body') body: ElementRef | undefined;

	constructor(private renderer: Renderer2) {}

	ngAfterViewInit() {
		// if(!this.header || !this.body) return;

		// var headerHeight = this.header.nativeElement.offsetHeight;

		// // var bodyHeight = this.body.nativeElement.offsetHeight;
	   
		// console.log('headerHeight:' + headerHeight);
		// const bodyHeight = window.innerHeight - headerHeight;
		// // console.log('bodyHeight: ' + bodyHeight);

		// this.renderer.setStyle(this.body.nativeElement, 'height', bodyHeight+'px');
	}

}
