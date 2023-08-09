import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  	constructor(private _snackBar: MatSnackBar) { }

	showSnackMessage(message: string, action: string, duration?: number) {
		if(duration){
			this._snackBar.open(message, action, {duration: duration * 1000});
		}else{
			this._snackBar.open(message, action);
		}
	}
}
