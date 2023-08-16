import { Component, Input } from '@angular/core';
import { CommandStatus } from 'src/app/core/interfaces';

@Component({
	selector: 'app-step-status',
	templateUrl: './step-status.component.html',
	styleUrls: ['./step-status.component.scss']
})
export class StepStatusComponent {

	@Input() status!: CommandStatus | number;

	constructor() { }

	protected getNodeStatus(): CommandStatus {
		if(!this.status){
			return CommandStatus.UNDEFINED;
		}

		if(typeof this.status === 'string'){
			return this.status;
		}else if(typeof this.status === 'number'){
			if(this.status < 0){
				return CommandStatus.STOPED;
			}else if(this.status > 0){
				return CommandStatus.STARTED;
			}else if(this.status === 0){
				return CommandStatus.PAUSED;
			}else{
				return CommandStatus.STOPED;
			}
		}else{
			return CommandStatus.UNDEFINED;
		}
	}
}
