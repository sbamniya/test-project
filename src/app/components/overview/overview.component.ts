import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { WindowSevice } from './../../services/window.service';
import { UserSevice } from './../../services/user.service';
import { OverviewSevice } from './../../services/overivew.service';

@Component({
  selector: 'myapp',
  templateUrl: `./overview.component.html`,
  styleUrls: ['./overview.component.css'],
  providers: [WindowSevice,UserSevice,OverviewSevice]
})
export class OverviewComponent {
    overviews = [];
    showOverView = [];
    host = 'http://localhost:3000/';
    overviewTask = {
        overViewId: 0,
        priority: 'low',
        responsibleUser: '',
        randomNumber: Math.floor(Math.pow(10, 10-1) + Math.random() * 9 * Math.pow(10, 10-1)),
        tags: [],
        tag: ''
    };
    users = [];
    showOverViewTaskForm = [];
    addingTask = false;
    tasks = [];

    constructor(private winServ : WindowSevice, private http: Http, private userService: UserSevice, private router: Router, private overViewSer: OverviewSevice){
        this.http.get(this.host+'get-overview').map(res=>res.json()).subscribe(data=>{
            if(data.isSuccess)
                this.overviews = data.data;
        });
        this.userService.getUsers().subscribe(data=>{
            this.users = data.data;
        });
    }
    onRightClick(event: MouseEvent, i: any){
        this.showOverView[i] = (this.showOverView[i]) ? false : true;
        this.showOverViewTaskForm[i] = false;
        for(let j in this.showOverViewTaskForm){
            if( j != i){
                this.showOverViewTaskForm[j] = false;
            }
        }
        for(let j in this.showOverView){
            if( j != i){
                this.showOverView[j] = false;
            }
        }
    }
    addOverViewTask(event: MouseEvent, overViewId: number, i: number){
        this.overviewTask.overViewId = overViewId;
        this.showOverView[i] = false;
        this.showOverViewTaskForm[i] = (this.showOverViewTaskForm[i]) ? false : true;
        this.overviewTask.randomNumber = Math.floor(Math.pow(10, 10-1) + Math.random() * 9 * Math.pow(10, 10-1));
    }
    addTask(index){
        if(this.overviewTask.tags.length==0){
            alert('Tag field is required');
            return;
        }
        this.addingTask =true;
        let tags = [];
        for(var i in this.overviewTask.tags){
            tags.push(this.overviewTask.tags[i].value);
        }
        this.overviewTask.tag = tags.join(',');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.put(this.host+'set-overview-task', JSON.stringify(this.overviewTask), options).map(res=>res.json()).subscribe(data=>{
            if(data.isSuccess){
                this.overViewSer.getTasks(this.overviewTask.overViewId).subscribe(data=>{
                    if(data.isSuccess)
                        this.tasks = data.data;
                });
                this.overviewTask = {
                    overViewId: 0,
                    priority: 'low',
                    responsibleUser: '',
                    randomNumber: Math.floor(Math.pow(10, 10-1) + Math.random() * 9 * Math.pow(10, 10-1)),
                    tags: [],
                    tag: ''
                };
                this.showOverViewTaskForm[index] = (this.showOverViewTaskForm[index]) ? false : true;
            }else{
                alert(data.message);
            }
            this.addingTask = false;
            
        });
    }
    cancelEdit(i){
        this.showOverViewTaskForm[i] = (this.showOverViewTaskForm[i]) ? false : true;
    }

    getTasks(id: any, i: any){
        this.showOverView[i] = false;
        this.showOverViewTaskForm[i] = false;
        for(let j in this.showOverViewTaskForm){
            if( j != i){
                this.showOverViewTaskForm[j] = false;
            }
        }
        for(let j in this.showOverView){
            if( j != i){
                this.showOverView[j] = false;
            }
        }
        this.overViewSer.getTasks(id).subscribe(data=>{
            if(data.isSuccess)
                this.tasks = data.data;
        });
    }
    logout(){
        this.userService.logOut().subscribe(data=>{
            this.winServ.removeItme('email');
            this.winServ.removeItme('password');
            this.router.navigateByUrl('/login');
        })
    }
}