import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserInterface } from 'src/app/Models/user-interface';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { AppointmentService } from 'src/app/services/appointment.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, fadeOutRightAnimation, fadeOutRightOnLeaveAnimation } from 'angular-animations';
import { DoctorScheduleService } from 'src/app/services/doctor-schedule.service';
import { DoctorSchedule } from 'src/app/Models/doctorSchedule';


@Component({
  selector: 'app-make-appointment',
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss'],
  animations: [fadeInOnEnterAnimation(),
  fadeOutRightOnLeaveAnimation()]
})
export class MakeAppointmentComponent implements OnInit {

  faCalendarAlt = faCalendarAlt;

  //CALENDAR
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  doctors: UserInterface[] = [];
  public searchDoctorForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
  })
  isLoggedIn: boolean = false;
  public appointmentForm = this.formBuilder.group({
    symptoms: ['', [Validators.required]],
    dateAppointment: ['', [Validators.required]],
    timeAppointment: ['', [Validators.required]]
  });

  constructor(private modal: NgbModal, private firestore: AngularFirestore, private formBuilder: FormBuilder, private appointmentService: AppointmentService,
    private doctorScheduleService: DoctorScheduleService) {

    let isLogged = localStorage.getItem('isLoggedIn');
    if (isLogged) {
      this.isLoggedIn = true;
      this.firestore.collection('users', ref => ref.where('roles.doctor', '==', true)).get().subscribe(querySnap => {
        querySnap.forEach((doc: any) => {
          this.doctors.push({
            id: doc.id,
            ...doc.data()
          });
        })
      });

      this.colors = {
        red: {
          primary: '#ad2121',
          secondary: '#FAE3E3',
        },
        blue: {
          primary: '#1e90ff',
          secondary: '#D1E8FF',
        },
        yellow: {
          primary: '#e3bc08',
          secondary: '#FDF1BA',
        },
      };
    }


  }

  ngOnInit(): void {

  }

  id: string = '';
  isDoctorSelected: boolean = false;
  doctorSchedule = {} as DoctorSchedule;

  searchDoctorAppointments(): void {
    this.events = [];
    this.doctorSchedule = {} as DoctorSchedule;
    let doctorEmail = this.searchDoctorForm.controls['email'].value;
    this.appointmentService.searchDoctorIdByEmail(doctorEmail).subscribe(querySnap => {
      this.id = querySnap.docs.length > 0 ? querySnap.docs[0].id : '';
      this.isDoctorSelected = true;
      if (this.id != '') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Please select a date',
          showConfirmButton: false,
          timer: 1000
        });
        this.appointmentService.getAppointmentsByDoctor(this.id).subscribe(querySnap => {
          querySnap.forEach((doc: any) => {
            this.events = [...this.events, {
              start: doc.data().date.toDate(),
              end: moment(doc.data().date.toDate(), 'hh:mm').add(30, 'm').toDate(),
              title: doc.data().description + ' [ ' + moment(doc.data().date.toDate()).format('HH:mm') + ' - ' + moment(doc.data().date.toDate(), 'hh:mm').add(30, 'm').format('hh:mm') + ']',
              color: (doc.data().status === "Accepted" ? this.colors.blue : doc.data().status === "Pending" ? this.colors.yellow : ''),
              actions: this.actions,
            }];
          });
        });

        this.doctorScheduleService.getScheduleByDoctorId(this.id).subscribe(querySnap => {
          querySnap.forEach((doc: any) => {
            this.doctorSchedule = {
              ...doc.data()
            }
          });
        });

      } else {
        Swal.fire({
          icon: 'warning',
          title: 'That doctor does not exist!! :[',
          showConfirmButton: true,
        });
        this.events = [];
        this.isDoctorSelected = false;
      }
    });
  }

  addAppointment() {
    let userEmail = localStorage.getItem('email');
    if (userEmail) {
      let symptoms = this.appointmentForm.controls['symptoms'].value;
      let dateAppointment = this.appointmentForm.controls['dateAppointment'].value;
      let timeAppointment = this.appointmentForm.controls['timeAppointment'].value;

      let date = new Date(dateAppointment + ' ' + timeAppointment);
      let dayName = moment(date).format('dddd');

      let isInSchedule: boolean = false;
      Object.entries(this.doctorSchedule).forEach(
        ([key, value]) => {
          if (key.toUpperCase() === dayName.toUpperCase() && value) {
            isInSchedule = true;
          }
        }
      );

      if (isInSchedule) {
        for (let i = 0; i < this.events.length; i++) {
          //SAME DAY
          if (moment(dateAppointment).isSame(moment(this.events[i].start).format('YYYY-MM-DD'))) {
            let timeStart = moment(this.events[i].start, 'hh:mm');
            let timeEnd = moment(this.events[i].end, 'hh:mm');

            if (moment(date, 'hh:mm').isBetween(timeStart, timeEnd.subtract(1, 'm'))) {
              Swal.fire({
                icon: 'warning',
                title: 'There\'s not available appointments at that time or date. Please try again.',
                showConfirmButton: true,
              });
            }
          }
          // if(date.isBetween(this.events[i].start, this.events[i].end)){

          // }
        }

        /*
        this.appointmentService.saveAppointment(userEmail, this.id, symptoms, dateAppointment, timeAppointment).then(response => {
          this.appointmentForm.controls['symptoms'].setValue('');
          this.appointmentForm.controls['dateAppointment'].setValue('');
          this.appointmentForm.controls['timeAppointment'].setValue('');
  
          Swal.fire({
            icon: 'success',
            title: 'Appointment made Successfully, please wait for confirmation :]',
            showConfirmButton: true,
          });
        });
        */
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Doctor does not work in that day, please try again!.',
          showConfirmButton: true,
        });
      }
    }
  }


  onChangeDoctor($event: any) {
    this.searchDoctorForm.controls['email'].setValue($event.target.value);
  }

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: this.colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: this.colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: this.colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: this.colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = false;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'sm' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
