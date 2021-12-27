import { Component, OnInit } from '@angular/core';
import { faBoxes, faHeartbeat, faHistory, faStar } from '@fortawesome/free-solid-svg-icons';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class HomeComponent implements OnInit {

  faHeartBeat = faHeartbeat;
  faStar = faStar;
  faBoxes = faBoxes;
  faHistory = faHistory;


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  get isLogged(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  }

}
