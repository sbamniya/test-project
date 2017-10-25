import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WindowSevice {
	constructor(private http: Http) {
		// code...
	}
    isLocalStoragSupported(){
        try{
            localStorage.setItem('whatever', 'something');
            localStorage.removeItem('whatever');
            return true;
        } catch (e){
            return false;
        }
    }

    setLocalItem(name, value){
        value = (typeof value == 'object') ? JSON.stringify(value) : value;
        try{
            localStorage.setItem(name, value);
            return true;
        }catch(e){
            return false;
        }
    }

    getLocalItem(name){
        var val = null;
        try{
            val = localStorage.getItem(name);
        }catch(E){}
        
        return val;
    }

    removeItme(name){
        try{
            localStorage.removeItem(name);
        }catch(E){}

        return true;
    }
}
