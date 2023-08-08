import { Component, Input } from '@angular/core';
import { DIPTest } from 'src/app/core/interfaces';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

	@Input() test: DIPTest | undefined;
}
