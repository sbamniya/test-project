import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserSevice {
    host = 'http://localhost:3000/';
	constructor(private http: Http) {
		// code...
	}
    loggInUser(username, password){
        return this.http.get(this.host+'login?email='+username+'&password='+password).map(res => res.json());
    }
    getUsers(){
        return this.http.get(this.host+'get-users').map(res => res.json());
    }
    logOut(){
        return this.http.get(this.host+'logout').map(res => res.json());
    }

    sendForgetLink(email){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.host+'send-forget-link', JSON.stringify({email: email}), options).map(res => res.json());
    }
    verifyLink(id: number, resetToken: string){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.host+'verify-link', JSON.stringify({userId: id, resetToken: resetToken}), options).map(res => res.json());
    }
    savePassword(userData){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.host+'save-password', JSON.stringify(userData), options).map(res => res.json());
    }
}
