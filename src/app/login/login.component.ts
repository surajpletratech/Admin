import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule,FormControl,Validators, ReactiveFormsModule,FormGroup,FormBuilder} from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {DataService} from '../data-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  Email: string;
  public myForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
 
  constructor(public fb:FormBuilder,public router:Router,public auth:DataService){

 
}

OnLogin($ev, value: any) {
 
  console.log(this.myForm.value.email,this.myForm.value.password);
 // this.auth.loginUser(this.myForm.value.email,this.myForm.value.password);
 
    $ev.preventDefault();
    for (let c in this.myForm.controls) {
        this.myForm.controls[c].markAsTouched();
    }
    if (this.myForm.valid) {
        this.auth.loginUser(value.email, value.password)
            .then((success) => {
                 console.log(value.email);
                 this.Email = value.email;
                 this.router.navigate(['home',{email:this.Email}]) ;        
            })
            .catch((error) => {
               console.log(error.message);
            })

    }


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
 this.router.navigate(['home']);
}
gotoSignup(){
  console.log('in signup page');
  this.router.navigate(['signup']);
}
}