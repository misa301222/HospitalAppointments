import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AdminToolsComponent } from './Components/admin-tools/admin-tools.component';
import { AddAppointmentComponent } from './Components/appointment/add-appointment/add-appointment.component';
import { ShowAppointmentComponent } from './Components/appointment/show-appointment/show-appointment.component';
import { ShowUsersComponent } from './Components/users/show-users/show-users.component';
import { AcceptAppointmentComponent } from './Components/appointment/accept-appointment/accept-appointment.component';
import { MakeAppointmentComponent } from './Components/appointment/make-appointment/make-appointment.component';
import { ShowDoctorsComponent } from './Components/doctors/show-doctors/show-doctors.component';
import { MyAppointmentsComponent } from './Components/appointment/my-appointments/my-appointments.component';
import { CreateUsersComponent } from './Components/users/create-users/create-users.component';
import { ShowAboutMeComponent } from './Components/about-me/show-about-me/show-about-me.component';
import { EditAboutMeComponent } from './Components/about-me/edit-about-me/edit-about-me.component';
import { FaqComponent } from './Components/faq/faq.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-tools', component: AdminToolsComponent },
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: 'show-appointment', component: ShowAppointmentComponent },
  { path: 'accept-appointment', component: AcceptAppointmentComponent },
  { path: 'show-users', component: ShowUsersComponent },
  { path: 'make-appointment', component: MakeAppointmentComponent },
  { path: 'show-doctors', component: ShowDoctorsComponent },
  { path: 'my-appointments', component: MyAppointmentsComponent },
  { path: 'create-users', component: CreateUsersComponent },
  { path: 'show-about-me', component: ShowAboutMeComponent },
  { path: 'edit-about-me', component: EditAboutMeComponent },
  { path: 'faq', component: FaqComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
