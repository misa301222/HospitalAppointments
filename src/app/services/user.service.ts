import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUserIdByEmail() {
    return this.firestore.collection('users', ref => ref.where('email', '==', localStorage.getItem('email'))).get();
  }
}
