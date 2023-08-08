import {NgModule} from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';



@NgModule({
	imports: [
		MatGridListModule,
		MatToolbarModule,
		MatCardModule,
		MatDividerModule,
		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,
		MatSelectModule,
		MatTreeModule,
		MatCheckboxModule,
	],
	exports: [
		MatGridListModule,
		MatToolbarModule,
		MatCardModule,
		MatDividerModule,
		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,
		MatSelectModule,
		MatTreeModule,
		MatCheckboxModule,
	]
})
export class MaterialModule {}