import {NgModule} from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
	imports: [
		MatGridListModule,
		MatToolbarModule,
		MatCardModule,
		MatDividerModule,
		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,
	],
	exports: [
		MatGridListModule,
		MatToolbarModule,
		MatCardModule,
		MatDividerModule,
		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,
	]
})
export class MaterialModule {}