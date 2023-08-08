import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DIPTest } from 'src/app/core/interfaces';
import { MainService } from 'src/app/core/main.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnChanges {
	isLoading: boolean = false;


	@Input() test: DIPTest | undefined;

	protected fileContent: any = '';

	constructor(private mainService: MainService) { }

	ngOnInit(): void { }

	ngOnChanges(changes: any): void {
		this.loadFile();
	}

	private loadFile(): void {
		this.isLoading = true;
		if(!this.test){
			console.warn('test is undefined')
			this.isLoading = false;
			return;
		}
		if(!this.test.logFile){
			console.warn('test.logFile is undefined')
			this.isLoading = false;
			return;
		}

		this.mainService.getLogFileByTestId(this.test.id).subscribe((file: File) => {
			if(file){
				this.readFile(file);
			}else{
				console.warn('file is undefined')
			}
			this.isLoading = false;
		});
	}


	// public onChange(fileList: FileList): void {
	public readFile(file: File): void {
		if(!file){
			console.warn('file is undefined')
			return;
		}
		this.isLoading = true;
		// let fileList: FileList = event.target.files;
		// let file = fileList[0];
		let fileReader: FileReader = new FileReader();
		let self = this;
		fileReader.onloadend = function(x) {
			if(fileReader.result != null){
				self.fileContent = fileReader.result;
			}else{
				console.warn('fileReader.result is null');
			}
		}
		fileReader.readAsText(file);
		this.isLoading = false;
	}
}
