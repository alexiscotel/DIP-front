import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

	private socket$!: WebSocketSubject<any>;

  	constructor() { 
		
	}

	public listen(): Observable<any> {
		return new Observable((subscriber) => {
			this.socket$ = webSocket(environment.websocketURL);

			const messageSubscription = this.socket$.subscribe({
				next: (data) => {
					// console.log('Message reçu :', data)
					subscriber.next(data);
				},
				error: (err) => {
					console.error('Erreur WebSocket :', err);
					subscriber.error(err);
				},
				complete: () => {
					subscriber.complete();
				},
			});
	  
			// Nettoyage lors de la désinscription de l'Observable
			return () => {
				messageSubscription.unsubscribe();
				if (this.socket$) {
					this.socket$.complete();
				}
			};
		});
	}
	

	public sendMessage(data: any) {
		this.socket$.next(data);
	}
}
