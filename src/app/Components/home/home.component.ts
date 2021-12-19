import { Component, OnInit } from '@angular/core';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class HomeComponent implements OnInit {

  //ICONS
  faHeartBeat = faHeartbeat;

  canEdit: boolean = false;
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService) {

  }


  ngOnInit(): void {
    this.isLogged();    
  }

  isLogged() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLoggedIn = true;
      } else {
        console.log('NOT user logged');
        this.isLoggedIn = false;
      }
    });
  }

}
