import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { faCalendar, faCalendarCheck, faEnvelope, faHeartbeat, faHome, faQuestion, faSignInAlt, faSignOutAlt, faToolbox, faUserMd } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from './Core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.None
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

  isLoggedIn: boolean = false;
  emailToShow: string = '';
  isAdmin: any = null;
  isDoctor: any = null;
  isUser: any = null;
  userUid: string = '';
  userName: string = '';

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.emailToShow = auth.email ? auth.email.toString() : '';
        localStorage.setItem('email', this.emailToShow);
        this.isLoggedIn = true;
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = userRole?.roles.administrator == true ? true : false;
          this.isDoctor = userRole?.roles.doctor == true ? true : false;
          this.isUser = userRole?.roles.user == true ? true : false;
        });
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  isAuth() {
    return this.authService.isAuth();
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
      this.isAdmin = null;
      this.isDoctor = null;
      this.isUser = null;
      this.afsAuth.signOut();
      this.router.navigate(['/login']);
    });
  }

  logout() {
    this.showSuccessLogoutSwal();
  }

}
