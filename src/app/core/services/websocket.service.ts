import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocketData, socketType } from '../interfaces/websocket';
// import { Message, MessageService } from './message.service';
import { HttpService } from './http.service';
import { UtilsService } from './utils.service';
import { TestService } from './test.service';
import { Test } from '../interfaces/Test';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

	private socket: WebSocket;
  
	constructor(
		// private messageService: MessageService, 
		private httpService: HttpService,
		private utilsService: UtilsService,
		private testService: TestService
	) {
		this.socket = new WebSocket(environment.websocketURL);

		this.socket.onopen = () => {
			console.log('Websocket connected');
		};
		this.socket.onmessage = (event) => {
			this.distributeData(JSON.parse(event.data) as SocketData);
		};
		this.socket.onerror = (event) => {
			console.log('Websocket error:', event);
		};
	}

	distributeData(socketData: SocketData) {
		console.log('distributeData', socketData)
		switch (socketData.type) {
			case socketType.join:
				console.log('distribute join:', socketData);
				this.utilsService.showSnackMessage(socketData.data.message+', get tests', 'OK', 5);

				this.testService.updateTestList(socketData.data.tests);
				break;
			case socketType.logFile:
				console.log('distribute logFile:', socketData.data);
				this.testService.receiveLogFileContent(socketData.data);
				break;
			case socketType.message:
				console.log('distribute message:', socketData.data);
				// this.messageService.addMessage(socketData.data.message);
				break;
			case socketType.start:
				console.log('distribute start:', socketData.data);
				break;
			case socketType.pause:
				console.log('distribute pause:', socketData.data);
				break;
			case socketType.stop:
				console.log('distribute stop:', socketData.data);
				break;
			default:
				break;
		}
	}
	
	public connect(): Observable<any> {
		return new Observable(observer => {
			this.socket.onmessage = (event) => {
				const socketData = JSON.parse(event.data) as SocketData;
				return observer.next(socketData);
			};
			this.socket.onerror = (event) => observer.error(event);
			this.socket.onclose = () => observer.complete();
		});
	}

	public sendData(data: any, socketType: socketType): void {
		const socketData: SocketData = {
			sender: 'client',
			type: socketType,
			data: data
		};
		this.socket.send(JSON.stringify(socketData));
	}


	// START / STOP TEST
	public startTest(test: Test): void {
		this.sendData(test, socketType.start);
	}
	public pauseTest(test: Test): void {
		this.sendData(test, socketType.pause);
	}
	public stopTest(test: Test): void {
		this.sendData(test, socketType.stop);
	}
}
