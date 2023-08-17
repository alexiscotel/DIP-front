import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DIPTest, TestStatus, StepStatus, Command, CommandStatus } from 'src/app/core/interfaces';

import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { UtilsService } from 'src/app/core/services/utils.service';


interface TreeNode {
	name: string;
	level?: number;
	status?: number;
	children?: TreeNode[];
}
interface FlatNode {
	expandable: boolean;
	name: string;
	level: number;
	status?: number;
}

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit, OnChanges {
	treeControl = new NestedTreeControl<TreeNode>(node => node.children);
	dataSource = new MatTreeNestedDataSource<any>();

	// commandStatus: CommandStatus = CommandStatus.STOPED;

	isLoading: boolean = false;

	@Input() test: DIPTest | undefined;

	@Input() fileContent: any = '';
	protected formatedStatus: TestStatus | undefined;
	// protected steps: Step[] = [];


	constructor(private websocketService: WebsocketService, private utilsService: UtilsService) { }

	ngOnInit(): void { }

	ngOnChanges(changes: any): void {
		// console.log('[steps] ngOnChanges', changes);

		if(changes.test && changes.test.currentValue !== changes.test.previousValue){
			const test = changes.test.currentValue;
			if(test && test.statusFile){
				this.askForStatusFileContent(test);
			}else{
				console.warn('No status file for this test', test);
			}
		}


		if(changes.fileContent && changes.fileContent.currentValue && changes.fileContent.currentValue !== changes.fileContent.previousValue){
			// console.log('[status] fileContent', changes.fileContent.currentValue);
			this.detectAndFormatSteps(changes.fileContent.currentValue);
		}
	}

	private askForStatusFileContent(test: DIPTest): void {
		// console.log('askForStatusFileContent', test);

		this.websocketService.sendMessage({
			sender: 'client',
			type: 'askStatusFile',
			data: test
		});
	}

	protected clearStatus(): void {
		this.fileContent = '';
	}

	private detectAndFormatSteps(data: any): void {
		const formatedStatus = this.formatStepStatus(data);
		// console.log('formatedStatus', formatedStatus);
		if(!formatedStatus){
			this.utilsService.showSnackMessage('ERROR - detectAndFormatSteps : wrong file format', 'OK');
			return;
		}
		this.formatedStatus = formatedStatus;

		this.updateTree();
	}

	private formatStepStatus(data: any): TestStatus {
		// console.log('formatStepStatus', data);
		return data as TestStatus;
	}

	// MAT TREE
	protected hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
	// protected getNodeStatus(status: number): CommandStatus {
	// 	console.log('getNodeStatus', status);

	// 	if(status < 0){
	// 		return CommandStatus.STOPED;
	// 	}else if(status > 0){
	// 		return CommandStatus.STARTED;
	// 	}else if(status === 0){
	// 		return CommandStatus.PAUSED;
	// 	}else{
	// 		return CommandStatus.STOPED;
	// 	}
	// }
	protected updateTree(): void {
		this.isLoading = true;
		this.dataSource.data = [];
		if(!this.formatedStatus){
			console.warn('formatedStatus is undefined')
			this.isLoading = false;
			return;
		}
		const nodes = this._transformer(this.formatedStatus);
		if(nodes && nodes.length > 0)
			this.dataSource.data = nodes;

		this.isLoading = false;
	}

	private _transformer(testStatus: TestStatus): TreeNode[] | undefined {
		if(!testStatus){
			console.warn('test is undefined')
			return;
		}
		if(!testStatus.steps){
			console.warn('test.steps is undefined')
			return;
		}

		let steps: TreeNode[] = []
		testStatus.steps.forEach((step: StepStatus) => {
			const commands: TreeNode[] = [];

			step.commands.forEach((command: Command) => {
				commands.push({
					name: command.label,
					level: 2,
					status: command.status ? command.status : 0,
				});
			});
			
			steps.push({
				name: step.label,
				level: 1,
				status: step.status ? step.status : 0,
				children: commands,
			});
		});
		
		return steps;
	};
}
