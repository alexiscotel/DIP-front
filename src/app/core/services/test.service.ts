import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Test } from '../interfaces/Test';
import { WebsocketService } from './websocket.service';
import { socketType } from '../interfaces/websocket';

@Injectable({
  	providedIn: 'root'
})
export class TestService {

	private testListSubject = new BehaviorSubject<Test[]>([]);
	public testList$ = this.testListSubject.asObservable();


	private logFileContentSubject = new BehaviorSubject<string>('');
	public logFileContent$ = this.logFileContentSubject.asObservable();

	constructor() {}

	// TEST LIST
	updateTestList(tests: Test[]) {
		this.testListSubject.next(tests);
	}
	// receiveTest(test: Test) {
	// 	const tests = this.testListSubject.getValue();
	// 	tests.push(test);
	// 	this.updateTestList(tests);
	// }
	// addTest(test: Test) {
	// 	const tests = this.testListSubject.getValue();
	// 	tests.push(test);
	// 	this.updateTestList(tests);
	// }

	// LOG FILE
	updateLogFileContent(content: string) {
		this.logFileContentSubject.next(content);
	}
	receiveLogFileContent(content: string): void {
		this.updateLogFileContent(content);
	}


	// // START / STOP TEST
	// public startTest(test: Test): void {
	// 	this.websocketService.sendData(test, socketType.start);
	// }
	// public pauseTest(test: Test): void {
	// 	this.websocketService.sendData(test, socketType.pause);
	// }
	// public stopTest(test: Test): void {
	// 	this.websocketService.sendData(test, socketType.stop);
	// }
}
