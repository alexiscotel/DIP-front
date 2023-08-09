import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DIPTest } from 'src/app/core/interfaces';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
	appName: string = environment.appName;
	@Input() isLoading: boolean = false;

	@Input() tests: DIPTest[] | null = [];
	@Output() selectChange = new EventEmitter<DIPTest>();

	selectedTest: DIPTest | undefined;

	protected headerForm!: FormGroup;
	protected testCtrl!: FormControl;

	@Output() startTest = new EventEmitter<DIPTest>();
	@Output() stopTest = new EventEmitter<DIPTest>();


	constructor(private formBuilder: FormBuilder) {
		this.testCtrl = this.formBuilder.control('');

		this.headerForm = this.formBuilder.group({
			test: this.testCtrl,
		});

		this.testCtrl.valueChanges.subscribe((value) => {
			const test = this.tests?.find((test) => test.id === value);
			if(test){
				this.selectedTest = test;
				this.selectChange.emit(test);
			}else{
				console.warn('Test not found')
			}
		});
	}

	ngOnInit(): void {
		if(this.tests && this.tests.length <= 0){
			console.warn('No tests to show');
			return;
		}
	}

	OnStartTest(): void {
		this.startTest.emit(this.selectedTest);
	}
	OnStopTest(): void {
		this.stopTest.emit(this.selectedTest);
	}

}
