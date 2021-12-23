import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  constructor(private firestore: AngularFirestore) { }

  getAboutMeByUserId(userId: string) {
    return this.firestore.collection('about-me', ref => ref.where('userId', '==', userId)).get();
  }

  getAboutMeByUserIdOrderByUserId(userId: string) {
    return this.firestore.collection('about-me', ref => ref.where('userId', '==', userId).orderBy('userId', 'asc')).get();
  }

  editAboutMeByUserId(aboutMeId: string, imageURL: string, location: string, phoneNumber: string, aboutMeHeader: string, aboutMeDescription: string, aboutMeAditionalInfo: string, hobbies?: string[], education?: string[]) {
    return this.firestore.collection('about-me').doc(aboutMeId).update({
      imageURL: imageURL,
      descriptionHeader: aboutMeHeader,
      description: aboutMeDescription,
      education: education,
      hobbies: hobbies,
      location: location,
      phoneNumber: phoneNumber,
      aditionalInfo: aboutMeAditionalInfo,
    });
  }  
}
