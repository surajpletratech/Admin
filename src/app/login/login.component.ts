import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule,FormControl,Validators, ReactiveFormsModule,FormGroup,FormBuilder} from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public myForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
 
  constructor(public fb:FormBuilder,public router:Router){

 
}
ngOnInit(): void {
  this.emailCtrl =  this.fb.control('', [Validators.required,Validators.email]);
  this.passwordCtrl= this.fb.control('', [Validators.required,Validators.minLength(7)]);
  this.myForm = this.fb.group({
    email:this.emailCtrl,
    password:this.passwordCtrl
  });
  
}
gotoProfile(){
  console.log('in console');
 this.router.navigate(['home']) 
}
}