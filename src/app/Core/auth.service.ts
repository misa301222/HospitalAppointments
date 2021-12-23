import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserInterface } from 'src/app/Models/user-interface';
import { map } from 'rxjs/operators';
import { AboutMe } from '../Models/about-me';

@Injectable()
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string, fullName: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user, fullName),
            resolve(userData),
            this.createBlankAboutMeSection(userData.user);
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

  createUser(email: string, pass: string, fullName: string, roles: any) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateCreatedUser(userData.user, fullName, roles),
            resolve(userData),
            this.createBlankAboutMeSection(userData.user);
        }).catch(err => console.log(reject(err)))
    });
  }

  private updateCreatedUser(user: any, fullName: string, roles: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      name: fullName,
      email: user.email,
      roles: roles
    }
    return userRef.set(data, { merge: true })
  }

  private createBlankAboutMeSection(user: any) {
    const documentId = this.afs.createId();
    const data: AboutMe = {
      id: documentId,
      userId: user.uid,
      imageURL: '',
      descriptionHeader: 'This is a placeholder for header',
      description: 'This is a placeholder for description',
      education: [''],
      hobbies: [''],
      location: 'Location',
      phoneNumber: '123456',
      aditionalInfo: '...',
    }

    return this.afs.doc(`about-me/${documentId}`).set(data);
  }


  isUserAdmin(userUid: string) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }


}