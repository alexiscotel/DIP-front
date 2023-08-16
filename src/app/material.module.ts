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

import {MatTreeModule} from '@angular/material/tree';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';


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
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatChipsModule,
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
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatChipsModule,
	]
})
export class MaterialModule {}