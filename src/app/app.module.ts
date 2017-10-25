import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from 'ng2-datepicker-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget/forget.component';
import { ResetPasswordComponent } from './components/forget/reset.component';
import { OverviewComponent } from './components/overview/overview.component';
/*Routes*/
const appRoutes: Routes = [
  { 
    path: 'login',
    component: LoginComponent 
  },
  { 
    path: 'forget-password',
    component: ForgetPasswordComponent 
  },
  { 
    path: 'overview',
    component: OverviewComponent 
  },
  { 
    path: 'reset-password/:resetToken/:id',
    component: ResetPasswordComponent 
  },
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    OverviewComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TagInputModule, 
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
