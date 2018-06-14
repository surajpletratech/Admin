import { Component, OnInit } from '@angular/core';
import {FormsModule,FormBuilder,Validator,FormGroup,FormControl, Validators} from '@angular/forms';
import {DataService} from '../../app/data-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signUpForm:FormGroup;
  userName:FormControl;
  email:FormControl;
  password:FormControl;
  mobile:FormControl; 
  
  constructor(private fb:FormBuilder,private auth:DataService) { 

  }

  onSubmit(){
    console.log('in submit method');
    console.log(this.signUpForm.value.username+'/'+'/'+this.signUpForm.value.email+'/'+this.signUpForm.value.password+'/'+this.signUpForm.value.mobileNo);
    let data=this.auth.signupUser(this.signUpForm.value.username,this.signUpForm.value.email,this.signUpForm.value.password,this.signUpForm.value.mobileNo);
    console.log(data);
  }
  ngOnInit() {
      this.userName = this.fb.control('',Validators.required);
      this.email = this.fb.control('',Validators.required);
      this.password =  this.fb.control('',[Validators.required,Validators.minLength(7)]);
      this.mobile = this.fb.control('',[Validators.required,Validators.minLength(10)]);

      this.signUpForm = this.fb.group({
        username: this.userName, 
        email:this.email,
        password:this.password,
        mobileNo:this.mobile
      })
  }

}
