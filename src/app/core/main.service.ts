import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { DIPTest } from './interfaces';
import { environment } from '../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class MainService {
	private url = `${environment.apiUrl}`;
	// public tests$!: Observable<DIPTest[]>;

	constructor(
        private http: HttpClient,
		private _snackBar: MatSnackBar
    ) {

	}

	public getTests(): Observable<DIPTest[]> {
		const url = `${this.url}/tests`;
		return this.http.get<DIPTest[]>(url);
	}

	public getTest(id: number): Observable<DIPTest> {
		const url = `${this.url}/tests/${id}`;
		return this.http.get<DIPTest>(url);
	}

	public getLogFileByTestId(id: string): Observable<File> {
		const url = `${this.url}/logs/${id}`;
		return this.http.get<File>(url);
	}


	public selectTest(test: DIPTest): Observable<DIPTest> {
		const url = `${this.url}/select`;
		const body = { id: test.id}
		return this.http.post<DIPTest>(url, body);
	}



	public startTest(test: DIPTest): Observable<DIPTest> {
		const url = `${this.url}/start`;
		const body = { id: test.id}
		return this.http.post<DIPTest>(url, body);
	}
	public stopTest(test: DIPTest): Observable<DIPTest> {
		const url = `${this.url}/stop`;
		const body = { id: test.id}
		return this.http.post<DIPTest>(url, body);
	}

	ShowSnackMessage(message: string, action: string, duration: number = 2) {
		this._snackBar.open(message, action, {duration: duration * 1000});
	}
}
