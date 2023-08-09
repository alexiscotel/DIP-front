import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { DIPTest } from 'src/app/core/interfaces';
import { HttpService } from 'src/app/core/services/http.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';

import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnChanges, OnDestroy {
	isLoading: boolean = false;

	@Input() test: DIPTest | undefined;

	// @Input() isTestStarted!: boolean;
	// @Input() isTestStoped!: boolean;

	@Input() fileContent: any = '';

	// private subscription!: Subscription;
	constructor(private httpService: HttpService, private websocketService: WebsocketService, private utilsService: UtilsService) { }

	ngOnInit(): void { }

	ngOnChanges(changes: any): void {
		console.log('ngOnChanges', changes);

		// if(changes.test){
		// 	this.updateDIPTest(changes.test.currentValue);
		// }

		// if(changes.isTestStarted?.currentValue){
		// 	console.log('isTestStarted', changes.isTestStarted.currentValue);
		// 	this.isTestStarted = false;

		// 	if(this.test)
		// 		this.startTest(this.test);
		// }

		// if(changes.isTestStoped?.currentValue){
		// 	console.log('isTestStoped', changes.isTestStoped.currentValue);
		// 	this.isTestStoped = false;

		// 	this.clearLog();
		// }
	}

	ngOnDestroy(): void {
		// console.log('ngOnDestroy');
		// if(this.subscription)
		// 	this.subscription.unsubscribe();
	}

	// private updateDIPTest(test: DIPTest): void {
	// 	if(!test){
	// 		console.warn('currentTest is undefined')
	// 		return;
	// 	}
	// 	if(!test.logFile){
	// 		console.warn('currentTest.logFile is undefined')
	// 		return;
	// 	}
	// 	this.fileToLoad = test.logFile;
	// }

	// private startTest(test: DIPTest): void {
	// 	console.log('start Test', test);

	// 	if(this.subscription)
	// 		this.subscription.unsubscribe();

	// 	this.httpService.startTest(test).subscribe({
	// 		next: (data: any) => {
	// 			console.log('backend start websocket', data);

	// 			this.subscription = this.websocketService.listen().subscribe({
	// 				next: (data) => {
	// 					console.log('listen websocket', data);
	// 					this.fileContent = data;
	// 				},
	// 				error: (err) => {
	// 					console.error('ERROR - listen websocket', err);
	// 					this.utilsService.showSnackMessage('ERROR - listen websocket : '+err, 'OK');
	// 				},
	// 				complete: () => {
	// 					console.log('listen websocket complete');
	// 				},
	// 			});
	// 		},
	// 		error: (err) => {
	// 			console.error('ERROR - backend start websocket', err);
	// 			this.utilsService.showSnackMessage('ERROR - backend start websocket : '+err, 'OK');
	// 		},
	// 		complete: () => {
	// 			// console.log('complete');
	// 		},
	// 	});
	// }

	protected clearLog(): void {
		this.fileContent = '';
	}
}
