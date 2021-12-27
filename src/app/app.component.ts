import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar, faCalendarCheck, faEnvelope, faHeartbeat, faHome, faQuestion, faSignInAlt, faSignOutAlt, faToolbox, faUserMd } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from './Core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hospital Appointments';
  faHeartBeat = faHeartbeat;
  faHome = faHome;
  faCalendar = faCalendar;
  faUserMd = faUserMd;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faToolbox = faToolbox;
  faEnvelope = faEnvelope;
  faCalendarCheck = faCalendarCheck;
  faQuestion = faQuestion;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  get isDoctor(): boolean {
    return localStorage.getItem('isDoctor') === 'true' ? true : false;
  }

  get isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true' ? true : false;
  }

  get isUser(): boolean {
    return localStorage.getItem('isUser') === 'true' ? true : false;
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  }

  get emailToShow(): string {
    return localStorage.getItem('email') || '{}';
  }

  isAuth() {
    return this.authService.isAuth();
  }

  logout() {
    this.showSuccessLogoutSwal();
  }

  showSuccessLogoutSwal() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logged out Successfully!',
      showConfirmButton: false,
      timer: 1000
    }).then(res => {
      localStorage.removeItem('email');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('roles');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isDoctor');
      localStorage.removeItem('isUser');
      this.authService.logoutUser();
      this.router.navigate(['/login']);
    });
  }



}
