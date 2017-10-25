import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OverviewSevice {
    host = 'http://localhost:3000/';
	constructor(private http: Http) {
		// code...
	}
    getTasks(id){
        return this.http.get(this.host+'get-task?overview='+id).map(res=>res.json());
    }
}
