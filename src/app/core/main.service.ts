import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { DIPTest } from './interfaces';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MainService {
	private url = `${environment.apiUrl}`;
	// public tests$!: Observable<DIPTest[]>;

	constructor(
        private http: HttpClient
    ) {
		// this.tests$ = this.getTests().pipe(delay(1000));
		// this.tests$.subscribe((tests) => {
		// 	console.log('tests', tests);
		// });
	}

	public getTests(): Observable<DIPTest[]> {
		const url = `${this.url}/tests`;
		return this.http.get<DIPTest[]>(url).pipe(delay(1000));
	}

	public getTest(id: number): Observable<DIPTest> {
		const url = `${this.url}/tests/${id}`;
		return this.http.get<DIPTest>(url).pipe(delay(1000));
	}

	public selectTest(test: DIPTest): Observable<DIPTest> {
		const url = `${this.url}/select`;
		return this.http.post<DIPTest>(url, test.id).pipe(delay(1000));
	}

	public startTest(test: DIPTest): Observable<DIPTest> {
		const url = `${this.url}/start`;
		return this.http.post<DIPTest>(url, test.id).pipe(delay(1000));
	}
	public stopTest(test: DIPTest): Observable<DIPTest> {
		const url = `${this.url}/stop`;
		return this.http.post<DIPTest>(url, test.id).pipe(delay(1000));
	}

	public getLogFileByTestId(id: string): Observable<File> {
		const url = `${this.url}/logs/${id}`;
		return this.http.get<File>(url).pipe(delay(1000));
	}
}
