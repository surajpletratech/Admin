import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router,Routes } from '@angular/router'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
//import { Observable } from 'rxjs/Observable';
import { User } from '../datamodel/datamodel';
import {environment}  from '../../environments/environment';
import { Observable } from 'rxjs';
import { ViewEncapsulation } from '@angular/core'
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { switchMap } from 'rxjs/operators/switchMap';
//import {environment} from '../../app/credential';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  item: any;
  uid:any;
  userData:any;
  public email:any;
  public user: Observable<User> = null;
  mesaage = 'Profile Updated Successfully!'
  private userCollection: AngularFirestoreCollection<User>;
  
  constructor(public router:Router,public route:ActivatedRoute,public af:AngularFireAuth,public db:AngularFirestore,public dialog: MatDialog) {
    //this.usercollection = db.collection<User>(environment.userCollection);
    this.userCollection = db.collection<User>("userprofile"); 
  }

  ngOnInit() {
    
    this.uid = localStorage.getItem('uid');
    console.log(this.uid);  
    this.route.params.subscribe(data=>{
      this.email = data.email
  } );
  console.log(this.email);
  console.log(this.af.auth.currentUser.uid);
    let items = this.db.doc<any>('userprofile/'+ this.af.auth.currentUser.uid);
    console.log(items)
    this.user = items.valueChanges();
    this.user.subscribe(Data=>{
      this.userData = Data;
      console.log(this.userData);
    })  
  
  }

  updateProfile(Email:string,Mobile:string,UserName:string){
      console.log(Email,' ', Mobile,' ',UserName);
      let Data = {
        uid: this.af.auth.currentUser.uid,
        email:Email,
        mobile:Mobile,
        username:UserName
      }
      
      this.userCollection.doc(this.af.auth.currentUser.uid).set(Data);
      console.log('Updated Profile');
      let dialogRef = this.dialog.open(HomeComponent, {
        height: '400px',
        width: '600px',
        data: 'Profile Updated Successfully!'
      });
  }

}
