import { Component, OnInit } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { fadeInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class FaqComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
