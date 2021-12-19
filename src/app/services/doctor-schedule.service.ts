import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { DoctorSchedule } from '../Models/doctorSchedule';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService {

  constructor(private firestore: AngularFirestore) { }

  saveSchedule(doctorId: string, startTime: number, endTime: number, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean) {
    const documentId = this.firestore.createId();
    const doctorSchedule: DoctorSchedule = {
      id: documentId,
      doctorId: doctorId,
      startTime: startTime,
      endTime: endTime,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday
    }
    return this.firestore.doc(`doctor-schedule/${doctorId}`).set(doctorSchedule);
  }

  getScheduleByDoctorId(doctorId: string) {
    return this.firestore.collection('doctor-schedule', ref => ref.where('doctorId', '==', doctorId)).get();
  }

  editScheduleByDoctorId(doctorId: string, startTime: number, endTime: number, monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean) {
    return this.firestore.collection('doctor-schedule').doc(doctorId).update({
      startTime: startTime,
      endTime: endTime,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday
    });
  }
}
