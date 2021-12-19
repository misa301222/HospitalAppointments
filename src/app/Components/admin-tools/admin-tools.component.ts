import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class AdminToolsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
