import { Component, OnInit } from '@angular/core';
import { Test } from './core/interfaces/Test';
import { Subscription } from 'rxjs';
import { WebsocketService } from './core/services/websocket.service';
import { TestService } from './core/services/test.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isTestsLoading = false;

	isTestStarted = false;
	isTestStoped = false;
	protected isTestInProgress(): boolean {
		return this.isTestStarted && !this.isTestStoped;
	}
	
	fileContent: any = '';
	
	tests: Test[] = [];
	selectedTest: Test | undefined;
	private subscription!: Subscription;
	constructor(private testService: TestService, private websocketService: WebsocketService) { 
		this.subscription = this.testService.testList$.subscribe((tests) => {
			console.log('test list updated', tests);
			this.tests = tests;
		});
	}

	ngOnInit(): void { }

	onSelectChange(test: Test): void {
		this.selectedTest = test;
	}

	onStartTest(test: Test): void {
		this.isTestStarted = true;
		this.isTestStoped = false;
		this.websocketService.startTest(test);
	}

	onPauseTest(test: Test): void {
		this.isTestStarted = false;
		this.isTestStoped = false;
		this.websocketService.pauseTest(test);
	}

	onStopTest(test: Test): void {
		this.isTestStarted = false;
		this.isTestStoped = true;
		this.websocketService.stopTest(test);
	}
}
