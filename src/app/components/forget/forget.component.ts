import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';

import { WindowSevice } from './../../services/window.service';
import { UserSevice } from './../../services/user.service';

@Component({
  selector: 'myapp',
  templateUrl: `./forget.component.html`,
  styleUrls: ['./forget.component.css'],
  providers: [WindowSevice, UserSevice]
})
export class ForgetPasswordComponent {
  user = {
    email: ''
  };
  constructor(private winServ : WindowSevice, private userServ: UserSevice,private route: ActivatedRoute, private router: Router){
    
  }
  sendResetLink(){
    let email = this.user.email;
    if(!email){
      alert('Please enter email !');
      return;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
      alert('Please enter valid email address !');
      return;
    }
    this.userServ.sendForgetLink(email).subscribe(data=>{
      if(data.isSuccess){
        alert('Reset password link is sent to your email address !');
        this.user.email = '';
        this.router.navigateByUrl('/login');
        return;
      }
      alert(data.message);
      this.router.navigateByUrl('/login');
      return;
    });
  }
}