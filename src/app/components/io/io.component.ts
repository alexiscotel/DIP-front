import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DIPTest } from 'src/app/core/interfaces';
import { UtilsService } from 'src/app/core/services/utils.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';

@Component({
	selector: 'app-io',
	templateUrl: './io.component.html',
	styleUrls: ['./io.component.scss']
})
export class IoComponent implements OnInit, OnChanges {
	
	isLoading: boolean = false;

	@Input() test: DIPTest | undefined;

	@Input() fileContent: any = '';
	infos: any = {};
	inputs: any = {};
	outputs: any = {};


	constructor(private websocketService: WebsocketService, private utilsService: UtilsService) { }

	ngOnInit(): void { }

	ngOnChanges(changes: any): void {
		console.log('[IO] ngOnChanges', changes);

		if(changes.test && changes.test.currentValue !== changes.test.previousValue){
			const test = changes.test.currentValue;
			if(test && test.ioFile){
				this.askForIoFileContent(test);
			}else{
				console.warn('No IO file for this test', test);
			}
		}

		if(changes.fileContent && changes.fileContent.currentValue && changes.fileContent.currentValue !== changes.fileContent.previousValue){
			console.log('[IO] fileContent', changes.fileContent.currentValue);
			this.detectAndFormatFileOutput(changes.fileContent.currentValue);
		}
	}

	private askForIoFileContent(test: DIPTest): void {
		console.log('askForIoFileContent', test);

		this.websocketService.sendMessage({
			sender: 'client',
			type: 'askIoFile',
			data: test
		});
	}

	private detectAndFormatFileOutput(ioFileContent: any): void {
		console.log('detectAndFormatFileOutput', ioFileContent);
		this.inputs = ioFileContent.inputs;
		this.outputs = ioFileContent.outputs;

		const tmp = ioFileContent
		delete tmp.outputs;
		delete tmp.inputs;
		this.infos = tmp;
		console.log('tmp', tmp);
	}
}
