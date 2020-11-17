import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = null;
  userToken: string;
  docResponse: any = [];

  constructor(private auth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {

    this.auth.authState.subscribe(state => {
      console.log(state);
      this.authState = state;

    });
  }


  loginUser(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {

        this.auth.currentUser.then(token => {

          token.getIdToken(true).then(idToken => {

            localStorage.setItem('tokenId', idToken)

            this.getUserType(email);
            this.userToken = idToken;
            this.router.navigate(['/home']);

          });

        });

      });
  }

  registerUser(email: string, password: string, userType: string) {
    debugger;
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {

        this.auth.currentUser.then(token => {

          token.getIdToken(true).then(idToken => {

            localStorage.setItem('tokenId', idToken)
            this.userToken = idToken;

            this.setUserType(email, userType);
            this.router.navigate(['/home']);

          });

        });

      });

  }

  setUserType(email: string, userType: string) {
    //setear tipo de usuario en el localST, para usar en el guard
    this.afs.collection('userType').add(
      {
        user: email,
        userType: userType
      }
    );
    localStorage.setItem('user', JSON.stringify({ user: email, userType: userType }));
  }

  getUserType(email: string) {
    //setear tipo de usuario en el localST, para usar en el guard
    const doc1 = this.afs.collection('userType',
      ref => ref.where('user', '==', email)
    );

    doc1.valueChanges()
      .subscribe(data => {
        debugger
        this.docResponse = data[0];
        localStorage.setItem('user', JSON.stringify({ user: email, userType: this.docResponse.userType }));
      });



  }


  getToken() {
    return this.auth.idToken;
  }

  getUser() {
    return this.authState ? this.authState.email : null;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('tokenId') != null;
  }


}
