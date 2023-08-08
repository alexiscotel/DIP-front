import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DIPTest } from './core/interfaces';
import { DATA_TESTS } from './core/data';
import { MainService } from './core/main.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isLoading = false;

	tests: DIPTest[] = DATA_TESTS;
	selectedTest: DIPTest | undefined;

	constructor(private mainService: MainService) { }

	ngOnInit(): void {
		this.isLoading = true;
		this.mainService.getTests().subscribe((tests) => {
			console.log('tests', tests);
			this.tests = tests;
			this.isLoading = false;
		});
	}

	onSelectChange(test: DIPTest): void {
		this.selectedTest = test;
	}

	onStartTest(test: DIPTest): void {
		console.log('onStartTest', test);
	}
	onStopTest(test: DIPTest): void {
		console.log('onStopTest', test);
	}
}
