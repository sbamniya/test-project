import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';

import { WindowSevice } from './../../services/window.service';
import { UserSevice } from './../../services/user.service';

@Component({
  selector: 'myapp',
  templateUrl: `./reset.component.html`,
  styleUrls: ['./reset.component.css'],
  providers: [WindowSevice, UserSevice]
})
export class ResetPasswordComponent {
  user = {
    password: '',
    cpassword: ''
  };
  id: number;
  resetToken: string;
  constructor(private winServ : WindowSevice, private userServ: UserSevice, private route: ActivatedRoute, private router: Router){
    
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.resetToken = params['resetToken'];
        if(!this.id || !this.resetToken){
            this.router.navigateByUrl('/login');
            return;
        }
        this.userServ.verifyLink(this.id, this.resetToken).subscribe(data=>{
            if(!data.isSuccess){
                alert(data.message);
                this.router.navigateByUrl('/login');
                return;
            }
        });
    });
  }
  updatePassword(){
    if(!this.user.password || !this.user.cpassword){
        alert('Please enter password !');
        return;
    }
    if(this.user.password != this.user.cpassword){
        alert('Please enter same password !');
        return;
    }

    let userData = {
        password: this.user.password,
        userId: this.id,
        resetToken: this.resetToken
    }
    this.userServ.savePassword(userData).subscribe(data=>{
        if(!data.isSuccess){
            alert(data.message);
            return;
        }
        alert(data.message);
        this.router.navigateByUrl('/login');
    });
  }
}