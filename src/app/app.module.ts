import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';

import { LogsComponent } from './components/logs/logs.component';
import { StepsComponent } from './components/steps/steps.component';
import { StepStatusComponent } from './components/steps/step-status/step-status.component';
import { IoComponent } from './components/io/io.component';


import { HttpService } from './core/services/http.service';
import { ExecComponent } from './components/exec/exec.component';



@NgModule({
	declarations: [
		AppComponent,
		LayoutComponent,
		ToolbarComponent,
		FooterComponent,
		LogsComponent,
		StepsComponent,
  		StepStatusComponent,
  		IoComponent,
    ExecComponent,
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MaterialModule,
		FormsModule, ReactiveFormsModule,
	],
	providers: [HttpService],
	bootstrap: [AppComponent]
})
export class AppModule { }
