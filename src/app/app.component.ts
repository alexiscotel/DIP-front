import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DIPTest, ExecutionStatus } from './core/interfaces';
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

	tests: DIPTest[] = [];
	selectedTest: DIPTest | undefined;

	logFileContent: any = '';
	statusFileContent: any = '';
	ioFileContent: any = '';
	currentExecution: any = '';

	currentTestStatus: ExecutionStatus = ExecutionStatus.UNDEFINED;

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
				// console.log('listen websocket', socketData);
				this.isTestsLoading = false;
				this.distributeDatas(socketData);
			},
			error: (err) => {
				console.error('ERROR - listen websocket', err);
				const error = typeof err === 'string' ? err : err;
				this.utilsService.showSnackMessage('ERROR - listen websocket : '+error, 'OK');
				this.isTestsLoading = false;
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
	onExecuteTest(arg: {action: string, test: DIPTest}): void {
		console.log('start Test', arg.action, arg.test);
		this.websocketService.sendMessage({
			sender: 'client',
			type: 'execTest',
			data: {
				action: arg.action,
				test: arg.test
			}
		});
	}

	private distributeDatas(socketData: any): void {
		switch(socketData.type){
			case 'join':
				this.joinConnection(socketData);
				break;
			case 'message':
				this.receiveMessage(socketData);					
				break;
			case 'readLogFile':
				this.readLogFile(socketData);
				break;
			case 'readStatusFile':
				this.readStatusFile(socketData);
				break;
			case 'readIoFile':
				this.readIoFile(socketData);
				break;
			case 'testExecuted':
				this.testExecuted(socketData);
				break;
			default:
				console.error('unknown type', socketData.type);
				this.utilsService.showSnackMessage('unknown type comming from websocket: '+socketData.type, 'OK');
				break;
		}
	}

	private joinConnection(socketData: any): void {
		// console.log('joinConnection');
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
	
	private readLogFile(socketData: any): void {
		// console.log('readLogFile', socketData);
		this.logFileContent = socketData.data;
	}

	private readStatusFile(socketData: any): void {
		// console.log('readStatusFile', socketData);
		this.statusFileContent = JSON.parse(socketData.data);
	}

	private readIoFile(socketData: any): void {
		const data = JSON.parse(socketData.data)
		console.log('readIoFile', data);
		if(data.message){
			console.error(data.message, socketData);
			this.utilsService.showSnackMessage(data.message, 'OK');
			return;
		}
		this.ioFileContent = JSON.parse(socketData.data);
	}

	private testExecuted(socketData: any): void {
		console.log('testStarted', socketData);
		this.currentExecution = socketData.data;
	}
}
