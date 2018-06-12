import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import {FormsModule,FormControl, Validators, ReactiveFormsModule,FormGroup,FormBuilder} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Routes, RouterModule } from '@angular/router'
const appRoutes: Routes = [ 
  {
    path: '',
    component:LoginComponent
  },
  { path: 'home', 
    component: HomeComponent
   }
  ];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgetpasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [],   
  bootstrap: [AppComponent]
})
export class AppModule { }
