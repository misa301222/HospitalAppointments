import { Component, OnInit } from '@angular/core';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { flipInXOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  animations:[
    flipInXOnEnterAnimation()
  ]
})
export class PageNotFoundComponent implements OnInit {

  faBug = faBug;

  constructor() { }

  ngOnInit(): void {
  }

}
