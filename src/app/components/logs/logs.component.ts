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
export class LogsComponent implements OnInit, OnChanges {
	isLoading: boolean = false;

	@Input() test: DIPTest | undefined;

	@Input() fileContent: any = '';
	constructor(private websocketService: WebsocketService) { }

	ngOnInit(): void { }

	ngOnChanges(changes: any): void {
		console.log('ngOnChanges', changes);

		if(changes.test && changes.test.currentValue !== changes.test.previousValue){
			this.askForLogFileContent(changes.test.currentValue);
		}
	}

	private askForLogFileContent(test: DIPTest): void {
		console.log('askForLogFileContent', test);

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
