import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DIPTest } from 'src/app/core/interfaces';
import { WebsocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'app-exec',
  templateUrl: './exec.component.html',
  styleUrls: ['./exec.component.scss']
})
export class ExecComponent {
	isLoading: boolean = false;

	@Input() fileContent: any = '';
	executionLogs: any = '';
	executionStatus: string = '';
	executionError: any = '';
	constructor(private websocketService: WebsocketService) { }

	ngOnInit(): void { }

	ngOnChanges(changes: any): void {
		// console.log('[logs] ngOnChanges', changes);

		if(changes.fileContent && changes.fileContent.currentValue !== changes.fileContent.previousValue){
			const fileContent = changes.fileContent.currentValue;
			console.log('fileContent', fileContent)
			this.formatExecution(fileContent);
		}
	}

	private formatExecution(data: any): void {
		console.log('formatExecution', data);
		const status = data.status;
		const error = data.error;
		const stderr = data.stderr;
		const stdout = data.stdout;

		if(status){
			this.executionStatus = status;
		}

		if(error){
			this.executionError += error;
		}

		if(stderr){
			this.executionLogs += stderr;
		}else if(stdout){
			this.executionLogs += stdout;
		}else{
			console.warn('formatExecution - no data to display');
		}
	}

	protected clearExecution(): void {
		this.fileContent = '';
		this.executionLogs = '';
		this.executionStatus = '';
		this.executionError = '';
	}
}
