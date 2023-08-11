import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Test } from '../interfaces/Test';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
	private url = `${environment.apiUrl}`;

	constructor(private http: HttpClient, private utilsService: UtilsService) { }


	// TESTS
	public loadTests(): void {
		this.getTests().subscribe({
			next: (data: any) => {
				console.log('get tests', data);
			},
			error: (err) => {
				console.error('ERROR - get tests', err);
				this.utilsService.showSnackMessage(err.message, 'OK');
			},
			complete: () => {
				// console.log('complete');
			},
		});
	}

	public getTests(): Observable<Test[]> {
		const url = `${this.url}/tests`;
		return this.http.get<Test[]>(url);
	}

	public getTest(id: number): Observable<Test> {
		const url = `${this.url}/tests/${id}`;
		return this.http.get<Test>(url);
	}

	// // START / STOP TEST
	// public startTest(test: Test): Observable<any> {
	// 	const url = `${this.url}/start/${test.id}`;
	// 	return this.http.get(url, { responseType: 'text' });
	// }
	// public pauseTest(test: Test): Observable<any> {
	// 	const url = `${this.url}/pause/${test.id}`;
	// 	return this.http.get(url, { responseType: 'text' });
	// }
	// public stopTest(test: Test): Observable<any> {
	// 	const url = `${this.url}/stop/${test.id}`;
	// 	return this.http.get(url, { responseType: 'text' });
	// }


	// CONNECTIONS
	// public getSocketConnections(): Observable<any> {
	// 	const url = `${this.url}/connections`;
	// 	return this.http.get<any>(url);
	// }
	// public countSocketConnections(): Observable<any> {
	// 	const url = `${this.url}/connections/count`;
	// 	return this.http.get<any>(url);
	// }
	// public getSocketConnection(id: string): Observable<any> {
	// 	const url = `${this.url}/connections/id/${id}`;
	// 	return this.http.get<any>(url);
	// }
}
