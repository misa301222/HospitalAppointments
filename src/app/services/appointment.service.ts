import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CalendarEventAction } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private firestore: AngularFirestore) { }

  saveAppointment(userEmail: string, doctorId: string, symptoms: string, dateAppointment: Date, timeAppointment: any) {
    const documentId = this.firestore.createId();

    let appointment = {
      id: documentId,
      email: userEmail,
      doctorId: doctorId,
      description: symptoms,
      date: new Date(dateAppointment + ' ' + timeAppointment),
      status: "Pending",
    }
    return this.firestore.doc(`appointment/${documentId}`).set(appointment);
  }

  editAppointmentStatus(appointmentId: string, status: string) {
    return this.firestore.collection('appointment').doc(appointmentId).update({ 'status': status });
  }

  getAppointmentByAppointmentId(appointmentId: string) {
    return this.firestore.collection('appointment', ref => ref.where('id', '==', appointmentId)).get();
  }

  getUserAppointmentsByEmail() {
    return this.firestore.collection('appointment', ref => ref.where('email', '==', localStorage.getItem('email'))).get();
  }

  searchDoctorIdByEmail(doctorEmail: string) {
    return this.firestore.collection('users', ref => ref.where('email', '==', doctorEmail)).get();
  }

  getAppointmentsByDoctor(id: string) {
    return this.firestore.collection('appointment', ref => ref.where('doctorId', '==', id)).get();
  }

  getDoctorByDoctorId(doctorId: string) {
    return this.firestore.collection('appointment', ref => ref.where('doctorId', '==', doctorId)).get();
  }

  getDoctorScheduleByDoctorId(doctorId: string) {
    return this.firestore.collection('doctor-schedule', ref => ref.where('doctorId', '==', doctorId)).get();
  }

}
