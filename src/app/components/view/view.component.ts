import { Component, Input } from '@angular/core';
import { Test } from 'src/app/core/interfaces/Test';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

	@Input() test: Test | undefined;

	@Input() isTestStarted!: boolean;
	@Input() isTestStoped!: boolean;
}
