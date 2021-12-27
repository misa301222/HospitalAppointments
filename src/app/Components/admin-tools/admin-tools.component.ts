import { Component, OnInit } from '@angular/core';
import { faUserCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class AdminToolsComponent implements OnInit {

  faUsers = faUsers;
  faUserCog = faUserCog;

  constructor() { }

  ngOnInit(): void {
  }

}
