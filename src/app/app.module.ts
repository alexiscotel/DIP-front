import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LogsComponent } from './components/logs/logs.component';
import { StepsComponent } from './components/steps/steps.component';
import { ViewComponent } from './components/view/view.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainService } from './core/main.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
	declarations: [
		AppComponent,
		LayoutComponent,
		ToolbarComponent,
		FooterComponent,
		LogsComponent,
		StepsComponent,
		ViewComponent,
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MaterialModule,
		FormsModule, ReactiveFormsModule,
	],
	providers: [MainService],
	bootstrap: [AppComponent]
})
export class AppModule { }
