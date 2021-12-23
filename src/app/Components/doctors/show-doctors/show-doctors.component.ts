import { Component, OnInit } from '@angular/core';
import { faStethoscope, faUsers } from '@fortawesome/free-solid-svg-icons';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AboutMe } from 'src/app/Models/about-me';
import { UserInterface } from 'src/app/Models/user-interface';
import { AboutMeService } from 'src/app/services/about-me.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-doctors',
  templateUrl: './show-doctors.component.html',
  styleUrls: ['./show-doctors.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class ShowDoctorsComponent implements OnInit {

  constructor(private userService: UserService, private aboutMeService: AboutMeService) { }
  faStethoscope = faStethoscope;
  faUsers = faUsers;
  
  doctorList: UserInterface[] = [];
  aboutMeList = [] as AboutMe[];

  ngOnInit(): void {
    this.getAllDoctors();
  }

  async getAllDoctors() {
    let idList: string[] = [];
    await this.userService.getAllDoctorsOrderById().subscribe(querySnap => {
      querySnap.forEach((doc: any) => {
        this.doctorList.push({
          ...doc.data()
        });
        idList.push(doc.data().id)
      });
      for (let i = 0; i < idList.length; i++) {
        this.getAboutMeByUserId(idList[i]);
      }
    });
  }

  getAboutMeByUserId(doctorId: string) {
    this.aboutMeService.getAboutMeByUserId(doctorId).subscribe(querySnap => {
      querySnap.forEach((doc: any) => {
        this.aboutMeList.push({
          ...doc.data()
        });
      });
    });
  }
}
