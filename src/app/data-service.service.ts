import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {User} from '../app/datamodel/datamodel'; 
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user:any;
 private userCollection:AngularFirestoreCollection<User>
  constructor(private afs:AngularFirestore) { 

    this.userCollection = afs.collection<User>("userprofile");
    this.user = firebase.auth().currentUser;
   // console.log(this.user.uid);
  }

  getUserCollection(): AngularFirestoreCollection<User>{
    return this.userCollection
  }

  getUser(id:string): User{
    let name:string;
    let mobile:string;

    this.userCollection.doc(id).ref.get().then(doc=>{
      if(doc.exists){
        console.log('Document Exist',doc.data());
        name = doc.data().name;
        mobile = doc.data().mobile;
      }
      else{
        console.log("No Such Document");
      }
    }).catch(err=>{
      console.log("No Such Document");
    });

    let user:User ={
      uid:id,
      username: name,
      mobile:mobile,
      email:"",
      password:""
    }
    console.log('auth user',user)
    return user
  }

  signupUser(name: string,email: string,
    password: string,
    pmobile: string):Promise<any> {
      
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(newUser => {
            console.log(newUser);
            console.log(newUser.user.uid);
            let data: User = {
                uid: newUser.user.uid,
                username: name,
                email: email,
                mobile: pmobile,
                password:password
            }

            this.userCollection.doc(data.uid).set(data);
            this.user = data;
            return data;
        })
        .catch(error => {
            console.error(error);
            throw new Error(error);
        });
        
    }

    loginUser(email: string,password: string):Promise<any> {
      let Email= email;
      let Password= password;
      console.log(email+'/'+password);
      return firebase.auth().signInWithEmailAndPassword(email, password); 
    }
  }

