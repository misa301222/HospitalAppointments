import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AuthService } from 'src/app/Core/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class CreateUsersComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  public createUserForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  onSubmit() {
    let roles = {
      adminsitrator: false,
      doctor: false,
      user: false
    }

    let name = this.createUserForm.controls['name'].value;
    let email = this.createUserForm.controls['email'].value;
    let password = this.createUserForm.controls['password'].value;
    let role = this.createUserForm.controls['role'].value;
    switch (role) {
      case 'user':
        roles.user = true;
        break;

      case 'doctor':
        roles.doctor = true;
        break;
    }

    this.authService.createUser(email, password, name, roles).then(response => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User Registered Successfully!',
        showConfirmButton: false,
        timer: 1000
      });

      this.createUserForm.controls['name'].setValue('');
      this.createUserForm.controls['email'].setValue('');
      this.createUserForm.controls['password'].setValue('');
      this.createUserForm.controls['role'].setValue('');
    });

  }

  onChangeRole($event: any) {
    this.createUserForm.controls['role'].setValue($event.target.value);
  }



  //TODO CREAR USUARIOS CON DIFERENTES ROLES

}
