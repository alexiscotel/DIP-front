import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LogsComponent } from './components/logs/logs.component';
import { StepsComponent } from './components/steps/steps.component';
import { ViewComponent } from './components/view/view.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
	declarations: [
		AppComponent,
  		ToolbarComponent,
		LogsComponent,
		StepsComponent,
		ViewComponent,
  		LayoutComponent,
    FooterComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
