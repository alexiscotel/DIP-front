import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DIPTest, Step } from 'src/app/core/interfaces';

import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


interface TreeNode {
	name: string;
	level?: number;
	children?: TreeNode[];
}
/** Flat node with expandable and level information */
interface FlatNode {
	expandable: boolean;
	name: string;
	level: number;
  }

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit, AfterViewInit, OnChanges {
	isLoading: boolean = false;
	
	@Input() test: DIPTest | undefined;
	
	treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  	dataSource = new MatTreeNestedDataSource<any>();

	constructor() { }

	ngOnInit(): void {
		this.updateTree();
	}

	@ViewChild('mytree') tree: any

	ngAfterViewInit() {
		this.updateTree();
	}

	ngOnChanges(changes: SimpleChanges): void { 
		this.updateTree();
	}

	protected updateTree(): void {
		this.isLoading = true;
		this.dataSource.data = [];
		if(!this.test){
			console.warn('test is undefined')
			this.isLoading = false;
			return;
		}
		const nodes = this._transformer(this.test);
		if(nodes && nodes.length > 0)
			this.dataSource.data = nodes;

		this.isLoading = false;
	}

	protected hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

	private _transformer(test: DIPTest): TreeNode[] | undefined {
		if(!test){
			console.warn('test is undefined')
			return;
		}
		if(!test.steps){
			console.warn('test.steps is undefined')
			return;
		}

		let steps: TreeNode[] = []
		test.steps.forEach((step: Step) => {
			const commands: TreeNode[] = [];
			step.commands?.forEach((command: string) => {
				commands.push({
					name: command
				});
			});

			steps.push({
				name: step.label,
				level: 1,
				children: commands,
			});
		});
		
		return steps;
	};

	isStepComplete(node: TreeNode): boolean {
		return false
	}

	onRefresh(): void {
		this.updateTree();
	}
}
