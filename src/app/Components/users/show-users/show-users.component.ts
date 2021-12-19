import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/Models/user-interface';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

  users: UserInterface[] = [];

  constructor(firestore: AngularFirestore) {

    firestore.collection('users', ref => ref.orderBy('email', 'asc')).get().subscribe(querySnap => {
      querySnap.forEach((doc: any) => {
        this.users.push({
          id: doc.id,
          ...doc.data()
        });
      })
      console.log(this.users);
    });

    // this.users = firestore.collection('users').valueChanges();
    /*
    firestore.collection('users').get().subscribe((querySnap) => {
      //use your data here
      // console.log(querySnap.docs);
      querySnap.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const id = doc.id;

        // this.users.push({
        //   id: '',
        //   name: '',
        //   email: '',
        //   password: '',
        //   photoUrl: '',
        //   roles: []
        // });
      })
    });
    */
  }




  ngOnInit(): void {

  }



}
