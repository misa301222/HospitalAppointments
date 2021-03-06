import { NgModule } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './Core/core.module';
import { AuthService } from './Core/auth.service';
import { AdminToolsComponent } from './Components/admin-tools/admin-tools.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAppointmentComponent } from './Components/appointment/add-appointment/add-appointment.component';
import { ShowAppointmentComponent } from './Components/appointment/show-appointment/show-appointment.component';
import { ShowUsersComponent } from './Components/users/show-users/show-users.component';
import { AcceptAppointmentComponent } from './Components/appointment/accept-appointment/accept-appointment.component';
import { MakeAppointmentComponent } from './Components/appointment/make-appointment/make-appointment.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ShowDoctorsComponent } from './Components/doctors/show-doctors/show-doctors.component';
import { MyAppointmentsComponent } from './Components/appointment/my-appointments/my-appointments.component';
import { CreateUsersComponent } from './Components/users/create-users/create-users.component';
import { ShowAboutMeComponent } from './Components/about-me/show-about-me/show-about-me.component';
import { EditAboutMeComponent } from './Components/about-me/edit-about-me/edit-about-me.component';
import { FaqComponent } from './Components/faq/faq.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { AboutThisAppComponent } from './Components/about-this-app/about-this-app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminToolsComponent,
    AddAppointmentComponent,
    ShowAppointmentComponent,
    ShowUsersComponent,
    AcceptAppointmentComponent,
    MakeAppointmentComponent,
    ShowDoctorsComponent,
    MyAppointmentsComponent,
    CreateUsersComponent,
    ShowAboutMeComponent,
    EditAboutMeComponent,
    FaqComponent,
    PageNotFoundComponent,
    AboutThisAppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    NgbModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
