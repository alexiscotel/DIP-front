import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { DIPTest } from '../interfaces';
import { environment } from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

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

	public getLogFileByTestId(id: string): Observable<any> {
		const url = `${this.url}/log/${id}`;
		return this.http.get(url, {responseType: 'text'});
	}


	public startTest(test: DIPTest): Observable<any> {
		const url = `${this.url}/start/${test.id}`;
		return this.http.get(url, { responseType: 'text' });
	}
	public stopTest(test: DIPTest): Observable<any> {
		const url = `${this.url}/stop/${test.id}`;
		return this.http.get(url, { responseType: 'text' });
	}

	ShowSnackMessage(message: string, action: string, duration: number = 2) {
		this._snackBar.open(message, action, {duration: duration * 1000});
	}
}
