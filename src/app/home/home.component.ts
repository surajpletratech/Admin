import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router,Routes } from '@angular/router';} 
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../datamodel/datamodel';
import {environment}  from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import {environment} from '../../app/credential';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  item: any;
  public email:any;
  public user: Observable<User> = null;
  userData:User;
  private usercollection: AngularFirestoreCollection<User>;
  constructor(public router:Router,public route:ActivatedRoute,public af:AngularFireAuth,public db:AngularFirestore) {
    this.usercollection = db.collection<User>(environment.userCollection);
   }

  ngOnInit() {
  this.route.params.subscribe(data=>{
    this.email = data.email
  })
  let items = this.db.doc<any>('userprofile/' + this.af.auth.currentUser.uid);
  this.user = items.valueChanges();
  this.user.subscribe(data =>
   {
       this.userData = data;
       console.log(this.userData);
   }
)
const size$ = new BehaviorSubject<string>(null);
      
this.item = size$.switchMap(size =>
this.db.collection(environment.userCollection, ref => ref.where('email', '==', size)).valueChanges() );
size$.next(this.email);

console.log('User Data:-',this.item);
    console.log(this.email);
    
  }

}
