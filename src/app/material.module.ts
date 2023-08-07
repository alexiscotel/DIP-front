import {NgModule} from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
	],
	exports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
	]
})
export class MaterialModule {}