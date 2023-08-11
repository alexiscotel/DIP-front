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

	constructor(private http: HttpClient) { }


	// TESTS
	public getTests(): Observable<DIPTest[]> {
		const url = `${this.url}/tests`;
		return this.http.get<DIPTest[]>(url);
	}

	public getTest(id: number): Observable<DIPTest> {
		const url = `${this.url}/tests/${id}`;
		return this.http.get<DIPTest>(url);
	}

	// START / STOP TEST
	public startTest(test: DIPTest): Observable<any> {
		const url = `${this.url}/start/${test.id}`;
		return this.http.get(url, { responseType: 'text' });
	}
	public stopTest(test: DIPTest): Observable<any> {
		const url = `${this.url}/stop/${test.id}`;
		return this.http.get(url, { responseType: 'text' });
	}

	// RESULTS
	public listenTest(test: DIPTest): Observable<any> {
		const url = `${this.url}/listen`;
		// const body = {test: test};
		return this.http.post<any>(url, test);
	}


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
