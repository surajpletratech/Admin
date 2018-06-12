import { Component, OnInit } from '@angular/core';
import {FormsModule,FormBuilder,Validator,FormGroup,FormControl, Validators} from '@angular/forms'
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
  
  constructor(private fb:FormBuilder) { 

  }

  ngOnInit() {
      this.userName = this.fb.control(' ',Validators.required);
      this.email = this.fb.control(' ',[Validators.required,Validators.email]);
      this.password =  this.fb.control(' ',[Validators.required,Validators.minLength(7)]);
      this.mobile = this.fb.control(' ',[Validators.required,Validators.minLength(10)]);

      this.signUpForm = this.fb.group({
        Userame: this.userName, 
        Email:this.email,
        Password:this.password,
        MobileNo:this.mobile
      })
  }

}
