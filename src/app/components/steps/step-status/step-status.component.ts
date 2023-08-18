import { Component, Input } from '@angular/core';
import { ExecutionStatus } from 'src/app/core/interfaces';

@Component({
	selector: 'app-step-status',
	templateUrl: './step-status.component.html',
	styleUrls: ['./step-status.component.scss']
})
export class StepStatusComponent {

	@Input() status!: ExecutionStatus | number;

	constructor() { }

	protected getNodeStatus(): ExecutionStatus {
		if(!this.status){
			return ExecutionStatus.UNDEFINED;
		}

		if(typeof this.status === 'string'){
			return this.status;
		}else if(typeof this.status === 'number'){
			if(this.status < 0){
				return ExecutionStatus.STOPED;
			}else if(this.status > 0){
				return ExecutionStatus.STARTED;
			}else if(this.status === 0){
				return ExecutionStatus.PAUSED;
			}else{
				return ExecutionStatus.STOPED;
			}
		}else{
			return ExecutionStatus.UNDEFINED;
		}
	}
}
