import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DIPTest } from 'src/app/core/interfaces';
import { WebsocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnChanges {
	isLoading: boolean = false;

	@Input() test: DIPTest | undefined;

	@Input() fileContent: any = '';
	constructor(private websocketService: WebsocketService) { }

	ngOnInit(): void { }

	ngOnChanges(changes: any): void {
		// console.log('[logs] ngOnChanges', changes);

		if(changes.test && changes.test.currentValue !== changes.test.previousValue){
			const test = changes.test.currentValue;
			if(test && test.logFile){
				this.askForLogFileContent(test);
			}else{
				console.warn('No log file for this test', test);
			}
		}
	}

	private askForLogFileContent(test: DIPTest): void {
		// console.log('askForLogFileContent', test);

		this.websocketService.sendMessage({
			sender: 'client',
			type: 'askLogFile',
			data: test
		});
	}

	protected clearLog(): void {
		this.fileContent = '';
	}
}
