import { Component, OnInit } from '@angular/core';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Appointment } from 'src/app/Models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class MyAppointmentsComponent implements OnInit {

  faCalendarCheck = faCalendarCheck;

  constructor(private appointmentService: AppointmentService) { }

  appointmentList: Appointment[] = [];

  ngOnInit(): void {
    this.getAppointmentsByUserEmail();
  }

  getAppointmentsByUserEmail() {
    this.appointmentService.getUserAppointmentsByEmail().subscribe(querySnap => {
      querySnap.forEach((doc: any) => {
        this.appointmentList.push({
          ...doc.data(),
          date: doc.data().date.toDate()
        });
        console.log(this.appointmentList);
      });
    });
  }

}
