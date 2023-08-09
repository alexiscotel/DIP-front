import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

	private socket$!: WebSocketSubject<any>;

  	constructor() { }

	// public listen(): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		// Faire quelque chose de manière asynchrone
	// 		// this.connect();
	// 		this.socket$ = webSocket(environment.websocketURL);

	// 		this.socket$.subscribe({
	// 			next: (message) => {
	// 				console.log('Message reçu depuis le serveur :', message);
	// 				resolve(message);
	// 			},
	// 			error: (err) => {
	// 				console.error('Erreur WebSocket :', err);
	// 				reject(err);
	// 			},
	// 			complete: () => {
	// 				console.log('Connexion WebSocket fermée');
	// 				resolve('Connexion WebSocket fermée');
	// 			},
	// 		});
	// 	});
	// }

	public listen(): Observable<any> {
		return new Observable((subscriber) => {
		  this.socket$ = webSocket(environment.websocketURL);
	  
		  const messageSubscription = this.socket$.subscribe(
			(message) => {
			  console.log('Message reçu depuis le serveur :', message);
			  subscriber.next(message);
			},
			(err) => {
			  console.error('Erreur WebSocket :', err);
			  subscriber.error(err);
			},
			() => {
			  console.log('Connexion WebSocket fermée');
			  subscriber.complete();
			}
		  );
	  
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
