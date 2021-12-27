import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutMe } from 'src/app/Models/about-me';
import { UserInterface } from 'src/app/Models/user-interface';
import { AboutMeService } from 'src/app/services/about-me.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-about-me',
  templateUrl: './edit-about-me.component.html',
  styleUrls: ['./edit-about-me.component.scss']
})
export class EditAboutMeComponent implements OnInit {

  constructor(private modalService: NgbModal, private aboutMeService: AboutMeService, private userService: UserService, private formBuilder: FormBuilder) { }

  public editProfileForm = this.formBuilder.group({
    imageURL: [''],
    location: [''],
    phoneNumber: [''],
    aboutMeHeader: [''],
    aboutMeDescription: [''],
    aboutMeAditionalInfo: ['']
  });
  aboutMe = {} as AboutMe;
  user = {} as UserInterface;

  ngOnInit(): void {
    this.userService.getUserIdByEmail().subscribe(querySnap => {
      querySnap.forEach((doc: any) => {
        this.user = {
          ...doc.data()
        }
        this.getAboutMeByUserId(doc.data().id);
      });
    });
  }

  getAboutMeByUserId(userId: string) {
    this.aboutMeService.getAboutMeByUserId(userId).subscribe(querySnap => {
      console.log('size: ' + querySnap.size);
      querySnap.forEach((doc: any) => {
        this.aboutMe = {
          ...doc.data()
        }
        this.editProfileForm.controls['imageURL'].setValue(doc.data().imageURL);
        this.editProfileForm.controls['location'].setValue(doc.data().location);
        this.editProfileForm.controls['phoneNumber'].setValue(doc.data().phoneNumber);
        this.editProfileForm.controls['aboutMeHeader'].setValue(doc.data().descriptionHeader);
        this.editProfileForm.controls['aboutMeDescription'].setValue(doc.data().description);
        this.editProfileForm.controls['aboutMeAditionalInfo'].setValue(doc.data().aditionalInfo);
      });
    });
  }

  async addHobby() {
    const { value: hobby } = await Swal.fire({
      title: 'Write here your hobby!',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (hobby) {
      this.aboutMe.hobbies?.push(hobby);
    }
  }

  deleteHobby(hobby: string) {
    if (this.aboutMe.hobbies) {
      let index = this.aboutMe.hobbies.indexOf(hobby);
      this.aboutMe.hobbies.splice(index, 1);
    }
  }

  async editHobby(hobby: string) {
    if (this.aboutMe.hobbies) {
      const { value: newHobby } = await Swal.fire({
        title: 'Write here your hobby!',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      });

      if (newHobby) {
        let index = this.aboutMe.hobbies.indexOf(hobby);
        this.aboutMe.hobbies.splice(index, 1, newHobby);
      }
    }
  }

  async addEducation() {
    const { value: education } = await Swal.fire({
      title: 'Write here your School!',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (education) {
      this.aboutMe.education?.push(education);
    }
  }

  async editEducation(education: string) {
    if (this.aboutMe.education) {
      const { value: newEducation } = await Swal.fire({
        title: 'Write here your School!',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      });

      if (newEducation) {
        let index = this.aboutMe.education.indexOf(education);
        this.aboutMe.education.splice(index, 1, newEducation);
      }
    }
  }

  deleteEducation(education: string) {
    if (this.aboutMe.education) {
      let index = this.aboutMe.education.indexOf(education);
      this.aboutMe.education.splice(index, 1);
    }
  }

  onSubmit() {
    console.log('on submit');

    let imageURL = this.editProfileForm.controls['imageURL'].value;
    let location = this.editProfileForm.controls['location'].value;
    let phoneNumber = this.editProfileForm.controls['phoneNumber'].value;
    let aboutMeHeader = this.editProfileForm.controls['aboutMeHeader'].value;
    let aboutMeDescription = this.editProfileForm.controls['aboutMeDescription'].value;
    let aboutMeAditionalInfo = this.editProfileForm.controls['aboutMeAditionalInfo'].value;

    if (this.aboutMe.id) {
      this.aboutMeService.editAboutMeByUserId(this.aboutMe.id, imageURL, location, phoneNumber, aboutMeHeader, aboutMeDescription, aboutMeAditionalInfo, this.aboutMe.hobbies, this.aboutMe.education).then(response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'About Me Edited Succesfully!',
          showConfirmButton: false,
          timer: 1000
        });
      });
    }
  }

}
