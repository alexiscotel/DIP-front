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

	logFileContent: any = '';
	statusFileContent: any = '';

	private subscription!: Subscription;
	constructor(private websocketService: WebsocketService, private utilsService: UtilsService) { }

	ngOnInit(): void {
		// this.getTests();
		this.listenWebsocketConnection();
	}

	private listenWebsocketConnection(): void {
		this.isTestsLoading = true;
		this.subscription = this.websocketService.listen().subscribe({
			next: (socketData) => {
				console.log('listen websocket', socketData);
				this.isTestsLoading = false;
				this.distributeDatas(socketData);
			},
			error: (err) => {
				console.error('ERROR - listen websocket', err);
				this.utilsService.showSnackMessage('ERROR - listen websocket : '+err, 'OK');
			},
			complete: () => {
				console.log('listen websocket complete');
				this.isTestsLoading = false;
			},
		});
	}

	onSelectChange(test: DIPTest): void {
		this.selectedTest = test;
	}
	onStartTest(test: DIPTest): void {
		console.log('start Test', test);
	}
	onStopTest(test: DIPTest): void {
		console.log('stop test', test);
	}

	private distributeDatas(socketData: any): void {
		switch(socketData.type){
			case 'join':
				this.joinConnection(socketData);
				break;
			case 'message':
				this.receiveMessage(socketData);					
				break;
			case 'startTest':
				this.testStarted(socketData);
				break;
			case 'stopTest':
				this.testStoped(socketData);
				break;
			case 'readLogFile':
				this.readLogFile(socketData);
				break;
			case 'readStatusFile':
				this.readStatusFile(socketData);
				break;
			default:
				console.error('unknown type', socketData.type);
				this.utilsService.showSnackMessage('unknown type comming from websocket: '+socketData.type, 'OK');
				break;
		}
	}

	private joinConnection(socketData: any): void {
		console.log('joinConnection');
		if(!socketData.data || socketData.data.connected !== true){
			this.utilsService.showSnackMessage('connection with websocket cannot be established', 'OK');
			return;
		}

		if(!socketData.data.tests){
			this.utilsService.showSnackMessage('no tests found', 'OK');
			return;
		}

		this.utilsService.showSnackMessage('connection with websocket established', 'OK', 5);
		this.tests = socketData.data.tests;
	}

	private receiveMessage(socketData: any): void {
		console.log('receiveMessage', socketData);

		if(!socketData.data.message){
			console.error('no message found in socketData', socketData);
			this.utilsService.showSnackMessage('no message found in socketData', 'OK');
			return;
		}

		this.utilsService.showSnackMessage(socketData.data.message, 'OK');
	}

	private testStarted(socketData: any): void {
		console.log('testStarted', socketData);
		this.isTestStarted = true;
		this.isTestStoped = false;
	}
	private testStoped(socketData: any): void {
		console.log('testStoped', socketData);
		this.isTestStarted = false;
		this.isTestStoped = true;
	}
	
	private readLogFile(socketData: any): void {
		console.log('readLogFile', socketData);
		this.logFileContent = socketData.data;
	}

	private readStatusFile(socketData: any): void {
		console.log('readStatusFile', socketData);
		this.statusFileContent = JSON.parse(socketData.data);
	}
}
