import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserInterface } from 'src/app/Models/user-interface';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string, fullName: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user, fullName)
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  // loginFacebookUser() {
  //   return this.afsAuth.signInWithPopup(new FacebookAuthProvider())
  //     .then(credential => this.updateUserData(credential.user))
  // }

  // loginGoogleUser() {
  //   return this.afsAuth.signInWithPopup(new GoogleAuthProvider())
  //     .then(credential => this.updateUserData(credential.user))
  // }

  logoutUser() {
    return this.afsAuth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user: any, fullName: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      name: fullName,
      email: user.email,
      roles: {
        administrator: false,
        user: true,
        doctor: false
      }
    }

    console.log(data);

    return userRef.set(data, { merge: true })
  }


  isUserAdmin(userUid: string) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }


}