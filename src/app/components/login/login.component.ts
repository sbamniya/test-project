import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { WindowSevice } from './../../services/window.service';
import { UserSevice } from './../../services/user.service';

@Component({
  selector: 'myapp',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.css'],
  providers: [WindowSevice,UserSevice]
})
export class LoginComponent {
    user = {
        remember: false,
        email: '',
        password:''
    };
    showRememberMe = false;
    host = 'http://localhost:3000/';
	constructor(private winServ : WindowSevice, private http: Http, private userSer: UserSevice, private router: Router) {
        if(this.winServ.isLocalStoragSupported()){
            console.log('Browser Supported !');
            this.showRememberMe = true;
            this.user.remember = (this.winServ.getLocalItem('remember')) ? true : false;
            if(this.showRememberMe && this.user.remember){
                /* get email and password */
                let email = this.winServ.getLocalItem('email');
                let password = this.winServ.getLocalItem('password');
                /* set email and password */
                this.user.email = email;
                this.user.password = password;
                if(email && password){
                    /* Login using saved credentials */
                    this.userSer.loggInUser(email, password).subscribe(data=>{
                        if(!data.isSuccess){
                            alert(data.message);
                            return;
                        }
                        this.router.navigateByUrl('/overview');
                    });
                }
            }
        }
    }
    
    loginUser(){
        if(!this.user.password || !this.user.email){
            alert('All fields are required !');
            return;   
        }
        if(this.showRememberMe && this.user.remember){
            this.winServ.setLocalItem('remember', true);
        }else{
            this.winServ.removeItme('remember');
        }
        this.userSer.loggInUser(this.user.email, this.user.password).subscribe(data=>{
            if(!data.isSuccess){
                alert(data.message);
                return;
            }
            if(this.showRememberMe && this.user.remember){
                this.winServ.setLocalItem('email', this.user.email);
                this.winServ.setLocalItem('password', this.user.password);
            }else{
                this.winServ.removeItme('email');
                this.winServ.removeItme('password');
            }
            this.router.navigateByUrl('/overview');
        });
    }
}