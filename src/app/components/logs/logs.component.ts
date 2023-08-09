import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DIPTest } from 'src/app/core/interfaces';
import { HttpService } from 'src/app/core/services/http.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnChanges {
	isLoading: boolean = false;

	@Input() test: DIPTest | undefined;

	@Input() isTestStarted!: boolean;
	@Input() isTestStoped!: boolean;

	protected fileToLoad = '';
	protected fileContent: any = '';

	private subscription!: Subscription;
	constructor(private httpService: HttpService, private websocketService: WebsocketService) { }

	ngOnInit(): void { }

	ngOnChanges(changes: any): void {
		if(changes.test){
			this.updateTest(changes.test.currentValue);
		}

		if(changes.isTestStarted){
			console.log('isTestStarted', changes.isTestStarted.currentValue);
			this.isTestStarted = false;

			if(this.test)
				this.startTest(this.test);
		}
	}

	private updateTest(test: DIPTest): void {
		if(!test){
			console.warn('currentTest is undefined')
			return;
		}
		if(!test.logFile){
			console.warn('currentTest.logFile is undefined')
			return;
		}
		this.fileToLoad = test.logFile;
	}

	private startTest(test: DIPTest): void {
		console.log('start Test', test);

		this.httpService.startTest(test).subscribe({
			next: (data: any) => {
				console.log('backend start websocket', data);

				this.subscription = this.websocketService.listen().subscribe({
					next: (data) => {
						console.log('listen websocket', data);
						this.fileContent = data;
					},
					error: (err) => {
						console.error('ERROR - listen websocket', err);
					},
					complete: () => {
						// console.log('complete');
					},
				});
			},
			error: (err) => {
				console.error('ERROR - backend start websocket', err);
			},
			complete: () => {
				// console.log('complete');
			},
		});
	}


	// private loadFile(): void {
	// 	this.isLoading = true;
	// 	if(!this.test){
	// 		console.warn('test is undefined')
	// 		this.isLoading = false;
	// 		return;
	// 	}
	// 	if(!this.test.logFile){
	// 		console.warn('test.logFile is undefined')
	// 		this.isLoading = false;
	// 		return;
	// 	}
	// 	this.httpService.getLogFileByTestId(this.test.id).subscribe({
	// 		next: (data: any) => {
	// 			console.log('next', data);
	// 			this.fileContent = data;
	// 		},
	// 		error: (err) => {
	// 			console.error(err);
	// 		},
	// 		complete: () => {
	// 			console.log('complete');
	// 			this.isLoading = false;
	// 		},
	// 	});
	// }


	// // public onChange(fileList: FileList): void {
	// public readFile(file: File): void {
	// 	if(!file){
	// 		console.warn('file is undefined')
	// 		return;
	// 	}
	// 	this.isLoading = true;
	// 	// let fileList: FileList = event.target.files;
	// 	// let file = fileList[0];
	// 	let fileReader: FileReader = new FileReader();
	// 	let self = this;
	// 	fileReader.onloadend = function(x) {
	// 		if(fileReader.result != null){
	// 			self.fileContent = fileReader.result;
	// 		}else{
	// 			console.warn('fileReader.result is null');
	// 		}
	// 	}
	// 	fileReader.readAsText(file);
	// 	this.isLoading = false;
	// }
}
