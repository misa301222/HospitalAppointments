import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-about-this-app',
  templateUrl: './about-this-app.component.html',
  styleUrls: ['./about-this-app.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class AboutThisAppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
