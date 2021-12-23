import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEnvelopeOpenText, faGamepad, faGraduationCap, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AboutMe } from 'src/app/Models/about-me';
import { UserInterface } from 'src/app/Models/user-interface';
import { AboutMeService } from 'src/app/services/about-me.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-about-me',
  templateUrl: './show-about-me.component.html',
  styleUrls: ['./show-about-me.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class ShowAboutMeComponent implements OnInit {

  constructor(private aboutMeService: AboutMeService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  faGraduationCap = faGraduationCap;
  faGamepad = faGamepad;
  faMapMarkerAlt = faMapMarkerAlt;
  faPhoneAlt = faPhoneAlt;
  faEnvelopeOpenText = faEnvelopeOpenText;

  aboutMe = {} as AboutMe;
  user = {} as UserInterface;

  isOwnProfile: boolean = false;

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');

    if (!email) {
      this.isOwnProfile = true;
      this.userService.getUserIdByEmail().subscribe(querySnap => {
        querySnap.forEach((doc: any) => {
          this.user = {
            ...doc.data()
          }
          this.getAboutMeByUserId(doc.data().id);
        });
      });
    } else {
      this.checkIsOwnProfile(email);
      this.userService.getUserIdByEmailOther(email).subscribe(querySnap => {
        querySnap.forEach((doc: any) => {
          this.user = {
            ...doc.data()
          }
          this.getAboutMeByUserId(doc.data().id);
        });
      });
    }
  }

  checkIsOwnProfile(email: string) {
    this.userService.getUserIdByEmail().subscribe(querySnap => {
      querySnap.forEach((doc: any) => {
        if (doc.data().email === email) {
          this.isOwnProfile = true;
        }
      });
    });
  }

  getAboutMeByUserId(userId: string) {
    this.aboutMeService.getAboutMeByUserId(userId).subscribe(querySnap => {
      querySnap.forEach((doc: any) => {
        this.aboutMe = {
          ...doc.data()
        }
      });
    });
  }

  editProfile() {
    this.router.navigate(['/edit-about-me']);
  }

}
