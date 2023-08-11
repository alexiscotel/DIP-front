import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DIPTest } from './core/interfaces';
import { HttpService } from './core/services/http.service';
import { UtilsService } from './core/services/utils.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from './core/services/websocket.service';

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

	tests: DIPTest[] = [];
	selectedTest: DIPTest | undefined;

	fileContent: any = '';

	private subscription!: Subscription;
	constructor(private httpService: HttpService, private websocketService: WebsocketService, private utilsService: UtilsService) { }

	ngOnInit(): void {
		this.getTests();
	}

	private getTests(): void {
		this.isTestsLoading = true;
		this.httpService.getTests().subscribe({
			next: (data: any) => {
				this.tests = data;
				this.isTestsLoading = false;
			},
			error: (err) => {
				console.error('ERROR - get tests', err);
				this.utilsService.showSnackMessage(err.message, 'OK');
				this.isTestsLoading = false;
				this.isTestStarted = false;
				this.isTestStoped = false;
			},
			complete: () => {
				// console.log('complete');
			},
		});
	}

	onSelectChange(test: DIPTest): void {
		this.selectedTest = test;
	}

	
	onStartTest(test: DIPTest): void {
		console.log('start Test', test);

		if(this.subscription)
			this.subscription.unsubscribe();

		this.isTestStoped = false;
		this.isTestStarted = true;
		this.httpService.startTest(test).subscribe({
			next: (data: any) => {
				console.log('backend start websocket', data);

				this.subscription = this.websocketService.listen().subscribe({
					next: (data) => {
						this.fileContent = data;
					},
					error: (err) => {
						console.error('ERROR - listen websocket', err);
						this.utilsService.showSnackMessage('ERROR - listen websocket : '+(err.message ? err.message : 'check internet connection'), 'OK');

						this.isTestsLoading = false;
						this.isTestStarted = false;
						this.isTestStoped = false;
					},
					complete: () => {
						console.log('listen websocket complete');
						this.isTestStoped = false;
					},
				});
			},
			error: (err) => {
				console.error('ERROR - backend start websocket', err);
				this.utilsService.showSnackMessage('ERROR - backend start websocket : '+(err.message ? err.message : 'check internet connection'), 'OK');
			},
			complete: () => {
				// console.log('complete');
			},
		});
	}


	onStopTest(test: DIPTest): void {
		console.log('stop test', test);

		this.httpService.stopTest(test).subscribe({
			next: (data: any) => {
				const parsedData = JSON.parse(data);
				console.log('websocket stoped', parsedData);
				console.log('data.message',parsedData.message)
				this.isTestStarted = false;
				this.isTestStoped = true;
				this.utilsService.showSnackMessage(parsedData.message, 'OK', 3);
			},
			error: (err) => {
				console.error('ERROR - stop websocket', err);
				this.utilsService.showSnackMessage('ERROR - stop websocket : '+(err.message ? err.message : 'check internet connection'), 'OK');
			},
			complete: () => {
				console.log('stop websocket complete');
			},
		});
	}

	onListenTest(test: DIPTest): void {
		console.log('listen test', test);


		this.subscription = this.websocketService.listen().subscribe({
			next: (data) => {
				console.log('listen websocket', data);
				if(data.message !== '_OK_'){
					this.utilsService.showSnackMessage('connection with websocket cannot be established', 'OK');
					return;
				}


				this.httpService.listenTest(test).subscribe({
					next: (data: any) => {
						console.log('listen websocket', data);
					},
					error: (err) => {
						console.error('ERROR - listen websocket', err);
						this.utilsService.showSnackMessage('ERROR - listen websocket : '+(err.message ? err.message : 'check internet connection'), 'OK');
					},
					complete: () => {
						console.log('listen websocket complete');
					},
				});


			},
			error: (err) => {
				console.error('ERROR - listen websocket', err);
				this.utilsService.showSnackMessage('ERROR - listen websocket : '+err, 'OK');
			},
			complete: () => {
				console.log('listen websocket complete');
			},
		});
	}
}
