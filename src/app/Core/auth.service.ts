import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserInterface } from 'src/app/Models/user-interface';
import { map } from 'rxjs/operators';
import { AboutMe } from '../Models/about-me';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {

  roles: string[] = [];
  isLoggedIn: boolean = false;
  emailToShow: string = '';
  isAdmin: any = null;
  isDoctor: any = null;
  isUser: any = null;
  userUid: string = '';
  userName: string = '';

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, private userService: UserService) { }

  registerUser(email: string, pass: string, fullName: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user, fullName),
            resolve(userData),
            this.createBlankAboutMeSection(userData.user),
            this.getCurrentUser();
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, pass).then(userData => {
        resolve(userData),
          this.getUserRoles(email);
      },
        err => reject(err));
    });
  }

  getUserRoles(email: string) {
    this.userService.getUserIdByEmailOther(email).subscribe(querySnap => {
      querySnap.forEach((doc: any) => {
        this.roles = doc.data().roles;
      });
      localStorage.setItem('roles', JSON.stringify(this.roles));
      this.getCurrentUser();
    });
  }

  logoutUser() {
    this.userUid = "";
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

  async getCurrentUser() {
    console.log('getcurrent');
    await this.isAuth().subscribe((auth: any) => {
      if (auth?.uid) {
        console.log('if');
        this.emailToShow = auth.email ? auth.email.toString() : '';
        localStorage.setItem('email', this.emailToShow);
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
        this.userUid = auth.uid;
        this.getRoles();
      } else {
        console.log('else');
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
      }
    });
  }

  async getRoles() {
    await this.isUserAdmin(this.userUid).subscribe(userRole => {
      if (this.userUid) {
        this.isAdmin = userRole?.roles.administrator == true ? true : false;
        this.isDoctor = userRole?.roles.doctor == true ? true : false;
        this.isUser = userRole?.roles.user == true ? true : false;

        localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
        localStorage.setItem('isDoctor', JSON.stringify(this.isDoctor));
        localStorage.setItem('isUser', JSON.stringify(this.isUser));
      }
    });
  }

}