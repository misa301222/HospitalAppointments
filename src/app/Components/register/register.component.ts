import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AuthService } from 'src/app/Core/auth.service';
import Swal from 'sweetalert2';
// import { FirebaseService } from 'src/app/Services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  public registerForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  isLoggedIn: boolean = false;

  ngOnInit(): void {
  }

  async onSubmit() {
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;
    let fullName = this.registerForm.controls['fullName'].value;

    await this.authService.registerUser(email, password, fullName).then(response => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User Registered Successfully!',
        showConfirmButton: false,
        timer: 1000
      }).then(res => {
        this.router.navigate(['/home']);
      });
    }).catch(err => {
      console.log(err);
    });
  }

}
