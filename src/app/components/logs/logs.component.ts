import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Test } from 'src/app/core/interfaces/Test';
import { HttpService } from 'src/app/core/services/http.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';

import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';
import { socketType } from 'src/app/core/interfaces/websocket';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnChanges, OnDestroy {
	isLoading: boolean = false;

	@Input() test: Test | undefined;
	@Input() fileContent: any = '';

	private subscription!: Subscription;
	constructor(private websocketService: WebsocketService, private testService: TestService) {
		this.subscription = this.testService.logFileContent$.subscribe((content) => {
			if(!content) return;
			console.log('log file content updated', content);
			this.fileContent = content;
		});
	 }

	ngOnInit(): void { }

	ngOnChanges(changes: any): void {
		console.log('ngOnChanges', changes);

		if(changes.test){
			if(changes.test.currentValue !== changes.test.previousValue){
				console.log('ask for log file', changes.test.currentValue);
				this.websocketService.sendData(changes.test.currentValue, socketType.askLogFile);
			}
		}
	}

	ngOnDestroy(): void {
		console.log('ngOnDestroy');
	}
	protected clearLog(): void {
		this.fileContent = '';
	}
}
