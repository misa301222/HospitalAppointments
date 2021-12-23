import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInOnEnterAnimation, rubberBandOnEnterAnimation } from 'angular-animations';
import { AuthService } from 'src/app/Core/auth.service';
import { Appointment } from 'src/app/Models/appointment';
import { DoctorSchedule } from 'src/app/Models/doctorSchedule';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorScheduleService } from 'src/app/services/doctor-schedule.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-appointment',
  templateUrl: './show-appointment.component.html',
  styleUrls: ['./show-appointment.component.scss'],
  animations: [fadeInOnEnterAnimation(),
  rubberBandOnEnterAnimation()]
})
export class ShowAppointmentComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private appointmentService: AppointmentService,
    private modalService: NgbModal, private formBuilder: FormBuilder, private doctorScheduleService: DoctorScheduleService, private userService: UserService) { }

  faCalendar = faCalendar;
  isUser: boolean = false;
  isDoctor: boolean = false;
  appointmentList: Appointment[] = [];
  doctorSchedule = {} as DoctorSchedule;
  public editFormSchedule = this.formBuilder.group({
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    monday: ['', [Validators.required]],
    tuesday: ['', [Validators.required]],
    wednesday: ['', [Validators.required]],
    thursday: ['', [Validators.required]],
    friday: ['', [Validators.required]],
    saturday: ['', [Validators.required]],
    sunday: ['', [Validators.required]],
  });

  public editFormAppointment = this.formBuilder.group({
    id: [''],
    email: ['', [Validators.required]],
    symptoms: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  doctorUid: string = '';

  ngOnInit(): void {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.authService.isUserAdmin(auth.uid).subscribe(userRole => {
          this.isUser = userRole?.roles.user == true ? true : false;
          this.isDoctor = userRole?.roles.doctor == true ? true : false;
          if (this.isUser) {
            this.appointmentService.getUserAppointmentsByEmail().subscribe(querySnap => {
              querySnap.forEach((doc: any) => {
                // this.users.push({
                //   id: doc.id,
                //   ...doc.data()
                // });
                console.log(doc);
              })
              console.log(this.appointmentList);
            });
          }

          if (this.isDoctor) {
            this.doctorUid = auth.uid;
            this.appointmentService.getAppointmentsByDoctorId(this.doctorUid).subscribe(querySnap => {
              querySnap.forEach((doc: any) => {
                this.appointmentList.push({
                  id: doc.id,
                  ...doc.data(),
                  date: doc.data().date.toDate(),
                });
                console.log(doc.data());
              })
              console.log(this.appointmentList);
            });

            this.appointmentService.getDoctorScheduleByDoctorId(this.doctorUid).subscribe(querySnap => {
              querySnap.forEach((doc: any) => {
                this.doctorSchedule = {
                  ...doc.data(),
                }
              });

              this.editFormSchedule.controls['startTime'].setValue(this.doctorSchedule.startTime);
              this.editFormSchedule.controls['endTime'].setValue(this.doctorSchedule.endTime);

              this.editFormSchedule.controls['monday'].setValue(this.doctorSchedule.monday == true ? 1 : 0);
              this.editFormSchedule.controls['tuesday'].setValue(this.doctorSchedule.tuesday == true ? 1 : 0);
              this.editFormSchedule.controls['wednesday'].setValue(this.doctorSchedule.wednesday == true ? 1 : 0);
              this.editFormSchedule.controls['thursday'].setValue(this.doctorSchedule.thursday == true ? 1 : 0);
              this.editFormSchedule.controls['friday'].setValue(this.doctorSchedule.friday == true ? 1 : 0);
              this.editFormSchedule.controls['saturday'].setValue(this.doctorSchedule.saturday == true ? 1 : 0);
              this.editFormSchedule.controls['sunday'].setValue(this.doctorSchedule.sunday == true ? 1 : 0);
            });

          }
        });
      }
    });
  }

  goToAddNewAppointment() {
    this.router.navigate(['add-appointment']);
  }

  editAppointment(modalEditAppointment: TemplateRef<any>, appointment: Appointment) {
    this.modalService.open(modalEditAppointment);
    this.editFormAppointment.controls['email'].setValue(appointment.email);
    this.editFormAppointment.controls['symptoms'].setValue(appointment.description);
    this.editFormAppointment.controls['status'].setValue(appointment.status);
    this.editFormAppointment.controls['id'].setValue(appointment.id);
  }

  onChangeStatus($event: any) {
    this.editFormAppointment.controls['status'].setValue($event.target.value);
  }

  saveAppointment() {
    let status = this.editFormAppointment.controls['status'].value;
    let id = this.editFormAppointment.controls['id'].value;
    this.appointmentService.editAppointmentStatus(id, status).then(response => {
      this.appointmentList = [];
      this.appointmentService.getAppointmentsByDoctorId(this.doctorUid).subscribe(querySnap => {
        querySnap.forEach((doc: any) => {
          this.appointmentList.push({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate(),
          });
        });
      });
    });

    this.modalService.dismissAll();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Appointment updated successfiully!',
      showConfirmButton: false,
      timer: 1000
    });

  }

  editSchedule(modalEditSchedule: TemplateRef<any>) {
    this.modalService.open(modalEditSchedule);

  }

  onChangeMonday($event: any) {
    this.editFormSchedule.controls['monday'].setValue($event.target.value);
  }

  onChangeTuesday($event: any) {
    this.editFormSchedule.controls['tuesday'].setValue($event.target.value);
  }

  onChangeWednesday($event: any) {
    this.editFormSchedule.controls['wednesday'].setValue($event.target.value);
  }

  onChangeThursday($event: any) {
    this.editFormSchedule.controls['thursday'].setValue($event.target.value);
  }

  onChangeFriday($event: any) {
    this.editFormSchedule.controls['friday'].setValue($event.target.value);
  }

  onChangeSaturday($event: any) {
    this.editFormSchedule.controls['saturday'].setValue($event.target.value);
  }

  onChangeSunday($event: any) {
    this.editFormSchedule.controls['sunday'].setValue($event.target.value);
  }

  saveSchedule() {
    let startTime = this.editFormSchedule.controls['startTime'].value;
    let endTime = this.editFormSchedule.controls['endTime'].value;

    let monday = this.editFormSchedule.controls['monday'].value == 1 ? true : false;
    let tuesday = this.editFormSchedule.controls['tuesday'].value == 1 ? true : false;
    let wednesday = this.editFormSchedule.controls['wednesday'].value == 1 ? true : false;
    let thursday = this.editFormSchedule.controls['thursday'].value == 1 ? true : false;
    let friday = this.editFormSchedule.controls['friday'].value == 1 ? true : false;
    let saturday = this.editFormSchedule.controls['saturday'].value == 1 ? true : false;
    let sunday = this.editFormSchedule.controls['sunday'].value == 1 ? true : false;

    if (this.doctorSchedule.startTime) {
      this.doctorScheduleService.getScheduleByDoctorId(this.doctorUid).subscribe(querySnap => {
        querySnap.forEach((doc: any) => {
          this.doctorScheduleService.editScheduleByDoctorId(doc.id, startTime, endTime, monday, tuesday, wednesday, thursday, friday, saturday, sunday).then(response => {
            this.appointmentService.getDoctorScheduleByDoctorId(this.doctorUid).subscribe(querySnap => {
              querySnap.forEach((doc: any) => {
                this.doctorSchedule = {
                  ...doc.data(),
                }
              });
            });
          });
        });
      });
    } else {
      this.userService.getUserIdByEmail().subscribe(querySnap => {
        querySnap.forEach((doc: any) => {
          this.doctorScheduleService.saveSchedule(doc.id, startTime, endTime, monday, tuesday, wednesday, thursday, friday, saturday, sunday).then(response => {
            this.appointmentService.getDoctorScheduleByDoctorId(this.doctorUid).subscribe(querySnap => {
              querySnap.forEach((doc: any) => {
                this.doctorSchedule = {
                  ...doc.data(),
                }
              });
            });
          });
        });
      });
    }

    this.modalService.dismissAll();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Schedule Updated successfiully!',
      showConfirmButton: false,
      timer: 1000
    });
  }

  deleteAppointment(appointment: Appointment) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log(appointment.id);

      if (result.isConfirmed) {
        if (appointment.id) {
          this.appointmentService.getAppointmentByAppointmentId(appointment.id).subscribe(querySnap => {
            querySnap.forEach((doc: any) => {
              doc.ref.delete();
            })
          });
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
      this.appointmentList = [];
      this.appointmentService.getAppointmentsByDoctorId(this.doctorUid).subscribe(querySnap => {
        querySnap.forEach((doc: any) => {
          this.appointmentList.push({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate(),
          });
        });
      });
    });

  }

}
