import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DIPTest } from './core/interfaces';
import { HttpService } from './core/services/http.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isTestsLoading = false;

	isTestStarted = false;
	isTestInProgress = false;
	testProgression = 0;
	isTestStoped = false;

	tests: DIPTest[] = [];
	selectedTest: DIPTest | undefined;

	constructor(private httpService: HttpService) { }

	ngOnInit(): void {
		this.isTestsLoading = true;
		this.httpService.getTests().subscribe((tests) => {
			this.tests = tests;
			this.isTestsLoading = false;
		});
	}

	onSelectChange(test: DIPTest): void {
		this.selectedTest = test;
	}

	onStartTest(test: DIPTest): void {
		// this.showSnackMessage('Test started', 'OK');

		this.isTestStarted = true;

		// this.isTestInProgress = true;
		// this.testProgression = 10;
		// this.httpService.startTest(test).subscribe((test) => {
		// 	this.showSnackMessage('Test was started', 'OK');
		// 	this.isTestInProgress = false;
		// });
	}
	onStopTest(test: DIPTest): void {
		this.showSnackMessage('Test stop', 'OK');
		this.isTestInProgress = true;
		this.httpService.stopTest(test).subscribe((test) => {
			this.showSnackMessage('Test was stop', 'OK');
			this.isTestInProgress = false;
		});
	}

	showSnackMessage(message: string, action: string) {
		this.httpService.ShowSnackMessage(message, action);
	}
}
