import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { delay, Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Test } from 'src/app/core/interfaces/Test';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
	appName: string = environment.appName;

	@Input() isLoading: boolean = false;
	@Input() isTestStarted: boolean = false;
	@Input() isTestStoped: boolean = false;

	@Input() tests: Test[] | null = [];
	@Output() selectChange = new EventEmitter<Test>();

	selectedTest: Test | undefined;

	protected headerForm!: FormGroup;
	protected testCtrl!: FormControl;

	@Output() startTest = new EventEmitter<Test>();
	@Output() pauseTest = new EventEmitter<Test>();
	@Output() stopTest = new EventEmitter<Test>();


	socketConnections$: Observable<any> | undefined;
	socketConnections: any = 0;


	constructor(private formBuilder: FormBuilder, private testService: TestService) {
		this.testCtrl = this.formBuilder.control('');

		this.headerForm = this.formBuilder.group({
			test: this.testCtrl,
		});

		this.testCtrl.valueChanges.subscribe((value) => {
			const test = this.tests?.find((test) => test.id === value);
			if(test){
				this.selectedTest = test;
				this.selectChange.emit(test);
				console.log('new test selected');
			}else{
				console.warn('Test not found')
			}
		});
	}

	ngOnInit(): void { }

	OnStartTest(): void {
		this.startTest.emit(this.selectedTest);
	}
	OnPauseTest(): void {
		this.pauseTest.emit(this.selectedTest);
	}
	OnStopTest(): void {
		this.stopTest.emit(this.selectedTest);
	}


}
